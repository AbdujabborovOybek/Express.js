require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const router = require("./router");
const path = require("path");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const imagesPath = path.join(__dirname, "../public", "images");
app.use("/user/img/", express.static(imagesPath));
app.use("/api/auth", router.auth);
app.use("/api", auth, router.rt);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
