const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const router = require("./router");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
const imagesPath = path.join(__dirname, "../public", "images");
app.use("/user/img/", express.static(imagesPath));
app.use("/api", router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
