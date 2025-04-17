const authService = require("../service/auth.service");
const response = require("../utils/response.helper");

class authController {
  async login(req, res) {
    try {
      const result = await authService.login(req, res);
      response[result.status](res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return response.internalServerError(res, "Internal server error");
    }
  }

  logout(req, res) {}
}

module.exports = new authController();
