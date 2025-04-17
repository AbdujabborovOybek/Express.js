require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const router = require("./router");
const path = require("path");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth.middleware");
const helmet = require("helmet");
const axios = require("axios");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
const imagesPath = path.join(__dirname, "../public", "images");
app.use("/user/img/", express.static(imagesPath));

app.use(
  helmet({
    "X-Powered-By": false,
    "Strict-Transport-Security": true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router.auth);
app.use("/api", auth, router.rt);

// post loclahost:8081/payment  const { amount, currency } = req.body;

app.post("/payment", async (req, res) => {
  try {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: "http://localhost:8081/payment",
      data: req.body,
    };

    const response = await axios(payload);

    if (response.status !== 200) {
      return res.status(500).json({ message: "Error processing payment" });
    }

    res.status(200).json({
      message: "Payment successful",
      data: response.data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ message: `the route ${req.url} does not exist` });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
