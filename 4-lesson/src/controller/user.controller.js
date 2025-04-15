const userService = require("../service/user.service");

class userController {
  async getUsers(req, res) {
    try {
      const users = await userService.getUsers(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req, res) {}

  async getUserById(req, res) {}

  async updateUser(req, res) {}

  async deleteUser(req, res) {}
}

module.exports = new userController();
