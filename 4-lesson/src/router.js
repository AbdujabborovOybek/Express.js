const rt = require("express").Router();

const uc = require("./controller/user.controller");

rt.get("/api/users", uc.getUsers);
rt.post("/api/users", uc.createUser);
rt.get("/api/users/:id", uc.getUserById);
rt.put("/api/users/:id", uc.updateUser);

module.exports = rt;
