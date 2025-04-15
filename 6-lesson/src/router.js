const rt = require("express").Router();
const multer = require("multer");

const uc = require("./controller/user.controller");
const uv = require("./validation/user.validation");
const upload = multer({});

rt.get("/users", uc.getUsers);
rt.post("/users", upload.single("img"), uv.createUser, uc.createUser);
rt.get("/users/:id", uc.getUserById);
rt.put("/users/:id", uc.updateUser);

module.exports = rt;
