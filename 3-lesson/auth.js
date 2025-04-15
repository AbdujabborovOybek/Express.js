const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ").pop() || null;

  if (!token) {
    return res.status(401).send({
      message: "Unauthorized",
      status: 401,
    });
  }

  if (token === "admin") {
    req.user = {
      name: "admin",
      role: "admin",
    };
    return next();
  }

  res.status(401).send({
    message: "Unauthorized",
    status: 401,
  });
};

module.exports = auth;
