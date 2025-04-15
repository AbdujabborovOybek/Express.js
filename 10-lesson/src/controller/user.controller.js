const userService = require("../service/user.service");
const response = require("../utils/response.helper");
const log = require("../service/logs.service");

class userController {
  async getUsers(req, res) {
    try {
      const result = await userService.getUsers(req, res);
      await response[result.res](res, result.message, result?.data);
    } catch (error) {
      await log.write(req, error?.message);
      res.status(500).json({ message: "Internal Server Error v1" });
    }
  }

  async createUser(req, res) {
    try {
      const result = await userService.createUser(req, res);
      await response[result.res](res, result.message, result?.data);
    } catch (error) {
      console.log(error);
      await log.write(req, error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserById(req, res) {}

  async updateUser(req, res) {}

  async deleteUser(req, res) {}
}

module.exports = new userController();
