const fs = require("fs");
const path = require("path");

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

  async createUser() {}

  async getUserById() {}

  async updateUser() {}

  async deleteUser() {}
}

module.exports = new userService();
