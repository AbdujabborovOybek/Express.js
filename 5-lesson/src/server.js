const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const router = require("./router");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
