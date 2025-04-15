const userService = require("../service/user.service");
const response = require("../utils/response.helper");

class userController {
  async getUsers(req, res) {
    try {
      const users = await userService.getUsers(req, res);
      // res.status(200).json(users);
      await response.success(res, "Users retrieved successfully", users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = await userService.createUser(req, res);
      await response.created(res, user.message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {}

  async updateUser(req, res) {}

  async deleteUser(req, res) {}
}

module.exports = new userController();
