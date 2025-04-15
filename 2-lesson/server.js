const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const fs = require("fs");
// HTTP methods (GET, POST, PUT, PATCH, DELETE)

if (!fs.existsSync("users.json")) {
  fs.writeFileSync("users.json", JSON.stringify([]));
}

const users = JSON.parse(fs.readFileSync("users.json"));

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  try {
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
  // console.log(req.params.id);
  const { id } = req.params;
  const findUser = users.find((user) => user.id === Number(id));

  if (!findUser) return res.status(404).send("User not found");
  res.send(findUser);
});

app.post("/add/user", (req, res) => {
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

app.use((req, res) => res.status(404).send("Page not found"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
