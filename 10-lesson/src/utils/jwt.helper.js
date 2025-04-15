const jsonwebtoken = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const accsessToken = process.env.JWT_ACCESS_TOKEN;
const refreshToken = process.env.JWT_REFRESH_TOKEN;

class jwt {
  generate(payload, exp) {
    try {
      return jsonwebtoken.sign(payload, secret, { expiresIn: exp });
    } catch (error) {
      return null;
    }
  }

  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (error) {
      return null;
    }
  }

  accsess(payload) {
    try {
      return jsonwebtoken.sign(payload, accsessToken, { expiresIn: "15m" });
    } catch (error) {
      return null;
    }
  }

  refresh(payload) {
    try {
      return jsonwebtoken.sign(payload, refreshToken, { expiresIn: "7d" });
    } catch (error) {
      return null;
    }
  }

  verifyAccsess(token) {
    try {
      return jsonwebtoken.verify(token, accsessToken);
    } catch (error) {
      return null;
    }
  }

  verifyRefresh(token) {
    try {
      return jsonwebtoken.verify(token, refreshToken);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new jwt();
