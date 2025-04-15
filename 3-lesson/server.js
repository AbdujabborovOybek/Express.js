const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const fs = require("fs");
const auth = require("./auth");
const responseTime = require("response-time");
const { v4: uuidv4 } = require("uuid");
// HTTP methods (GET, POST, PUT, PATCH, DELETE)

if (!fs.existsSync("users.json")) {
  fs.writeFileSync("users.json", JSON.stringify([]));
}

const reqInfo = (req, res, next) => {
  req.info = {
    id: uuidv4(),
    method: req.method,
    date: new Date().toUTCString(),
    time: new Date().getTime(),
  };

  res.header("Request-Id", req.info.id);
  res.header("Request-Date", req.info.date);
  res.header("Request-Time", req.info.time);

  next();
};

const users = JSON.parse(fs.readFileSync("users.json"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(), auth, responseTime(), reqInfo);

const userValidation = require("./user.validate");

app.get("/users", (req, res) => {
  try {
    console.log(req.info);

    const age = req.query.age || null;
    if (!age) return res.send(users);

    const from = Number(age?.split("-").shift());
    const to = Number(age?.split("-").pop());

    const filteredUsers = users.filter(
      (user) => user.age >= from && user.age <= to
    );

    if (!filteredUsers.length)
      return res.status(404).send({
        message: "No users found",
        status: 404,
      });

    res.send(filteredUsers);
  } catch (error) {
    console.log(error);

    res.status(500).send("Internal server error");
  }
});

app.get("/users/:id", (req, res) => {
  console.log(req.info);
  const { id } = req.params;
  const findUser = users.find((user) => user.id === Number(id));

  if (!findUser) return res.status(404).send("User not found");
  res.send(findUser);
});

app.post("/add/user", userValidation, (req, res) => {
  const { name, age } = req.body;
  const user = {
    id: users.length + 1,
    name: name,
    age,
  };
  users.push(user);
  fs.writeFileSync("users.json", JSON.stringify(users));

  res.status(201).send({
    message: "User added successfully",
    status: "success",
    statusCode: 201,
  });
});

app.patch("/update/user/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name = null, age = null } = req.body;

    const user = users.find((user) => user.id === Number(id)) || null;
    if (!user) return res.status(404).send("User not found");

    const index = users.indexOf(user);

    const updatedUser = {
      id: user.id,
      name: name || user.name,
      age: age || user.age,
    };

    users.splice(index, 1, updatedUser);
    fs.writeFileSync("users.json", JSON.stringify(users));

    res.send({
      message: "User updated successfully",
      status: "success",
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.delete("/delete/user/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find((user) => user.id === Number(id)) || null;
    if (!user) return res.status(404).send("User not found");

    const index = users.indexOf(user);
    users.splice(index, 1);
    fs.writeFileSync("users.json", JSON.stringify(users));

    res.send({
      message: "User deleted successfully",
      status: "success",
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.use((req, res) =>
  res.status(404).send({
    message: "Resource not found",
    status: 404,
  })
);

app.listen(port, () => console.log(`Server is running on port ${port}`));
