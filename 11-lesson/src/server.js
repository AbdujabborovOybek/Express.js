require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const router = require("./router");
const path = require("path");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth.middleware");
const helmet = require("helmet");

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

app.use((req, res, next) => {
  res.status(404).json({ message: `the route ${req.url} does not exist` });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
