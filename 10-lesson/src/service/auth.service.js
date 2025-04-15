const jwt = require("../utils/jwt.helper");

const user = {
  id: 1,
  username: "admin",
  password: "admin",
  fullname: "Admin",
};

class authService {
  async login(req, res) {
    return new Promise((resolve, reject) => {
      try {
        const refreshToken = jwt.refresh({ id: user.id });
        res.cookie("refreshToken", refreshToken, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const accessToken = jwt.accsess({ id: user.id });
        res.cookie("accessToken", accessToken, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 15 * 60 * 1000,
        });

        resolve({
          status: "success",
          message: "Success",
          data: user,
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  logout(req, res) {}
}

module.exports = new authService();
