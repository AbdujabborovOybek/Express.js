const jwt = require("../utils/jwt.helper");

const user = {
  id: 1,
  username: "admin",
  password: "admin",
  fullname: "Admin",
};

class AuthService {
  async login(req, res) {
    try {
      // Refresh token yaratish va cookie da saqlash
      const refreshToken = jwt.refresh({ id: user.id });
      res.cookie("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        // Agar production rejimida bo'lsangiz HTTPS talab etiladi
        secure: process.env.NODE_ENV === "production",
        // Agar cookie cross-site bo'lsa "none", aks holda "lax"
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kun
      });

      // Access token yaratish va cookie da saqlash
      const accessToken = jwt.access({ id: user.id });
      res.cookie("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000, // 15 daqiqa
      });

      return res.json({
        status: "success",
        message: "Success",
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  }

  logout(req, res) {
    // Cookie'larni tozalash: agar cookie yo'li "/"
    res.clearCookie("refreshToken", { path: "/" });
    res.clearCookie("accessToken", { path: "/" });
    return res.json({ status: "success", message: "Logged out" });
  }
}

module.exports = new AuthService();
