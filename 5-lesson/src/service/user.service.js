const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

class userService {
  async getUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const file = path.join(__dirname, "./data.json");
        const users = JSON.parse(fs.readFileSync(file, "utf8"));
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createUser(req, res) {
    return new Promise(async (resolve, reject) => {
      req.body.id = uuidv4();

      const file = path.join(__dirname, "./data.json");
      const users = JSON.parse(fs.readFileSync(file, "utf8"));
      users.push(req.body);
      fs.writeFileSync(file, JSON.stringify(users, null, 2));

      resolve({ message: "User created successfully" });
    });
  }

  async getUserById() {}

  async updateUser() {}

  async deleteUser() {}
}

module.exports = new userService();
