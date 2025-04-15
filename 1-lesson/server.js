const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// HTTP methods (GET, POST, PUT, PATCH, DELETE)

const users = [
  {
    id: 1,
    name: "John",
    age: 30,
  },
  {
    id: 2,
    name: "Jane",
    age: 25,
  },
  {
    id: 3,
    name: "Doe",
    age: 20,
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  console.log(req.headers);
  res.send(users);
});

app.get("/greet", (req, res) => {
  res.send(`Welcome to Express!`);
});

app.post("/data", (req, res) => {
  console.log(req.body);
  //   const name = req.body.name;
  //   const age = req.body.age;

  const { name, age } = req.body;
  res.json({
    id: users.length + 1,
    status: "success",
    message: "Successfully received data",
  });
});

app.use((req, res) => {
  console.log(req.path);
  res.status(404).send("Page not found");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
