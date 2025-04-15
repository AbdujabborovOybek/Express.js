const rt = require("express").Router();
const multer = require("multer");

const auth = require("express").Router();
const ac = require("./controller/auth.controller");
const av = require("./validation/auth.validation");
auth.post("/login", av.login, ac.login);

const uc = require("./controller/user.controller");
const uv = require("./validation/user.validation");
const upload = multer({});

rt.get("/users", uc.getUsers);
rt.post("/users", upload.single("img"), uv.createUser, uc.createUser);
rt.get("/users/:id", uc.getUserById);
rt.put("/users/:id", uc.updateUser);

module.exports = { rt, auth };
