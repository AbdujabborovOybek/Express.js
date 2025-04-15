const rsponse = require("../utils/response.helper");
const jwt = require("../utils/jwt.helper");

const auth = async (req, res, next) => {
  try {
    const accessToken = req?.cookies?.accessToken || null;
    const refreshToken = req?.cookies?.refreshToken || null;

    if (accessToken) {
      const user = jwt.verifyAccsess(accessToken);
      if (user) {
        req.user = user;
        return next();
      }

      if (refreshToken) {
        const token = jwt.verifyRefresh(refreshToken);
        if (token) {
          const newAccessToken = jwt.accsess({ id: token.id });

          res.cookie("accessToken", newAccessToken, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000,
          });
          req.user = user;
          return next();
        }

        return rsponse.unauthorized(res, "Unauthorized");
      }
    }

    if (refreshToken) {
      const token = jwt.verifyRefresh(refreshToken);

      if (token) {
        const newAccessToken = jwt.accsess({ id: token.id });

        res.cookie("accessToken", newAccessToken, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 15 * 60 * 1000,
        });

        req.user = { id: token.id };
        return next();
      }

      return rsponse.unauthorized(res, "Unauthorized");
    }

    return rsponse.unauthorized(res, "Unauthorized");
  } catch (error) {
    console.log(error);
    return rsponse.unauthorized(res, "Unauthorized");
  }
};

module.exports = auth;
