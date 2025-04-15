const rt = require("express").Router();

const uc = require("./controller/user.controller");
const uv = require("./validation/user.validation");

rt.get("/users", uc.getUsers);
rt.post("/users", uv.createUser, uc.createUser);
rt.get("/users/:id", uc.getUserById);
rt.put("/users/:id", uc.updateUser);

module.exports = rt;
