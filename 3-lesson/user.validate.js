const validate = (req, res, next) => {
  const { name, age } = req.body;

  if (!name) {
    return res.status(400).send({
      message: "Name is required",
      status: 400,
    });
  }

  if (!age) {
    return res.status(400).send({
      message: "Age is required",
      status: 400,
    });
  }

  if (typeof name !== "string") {
    return res.status(400).send({
      message: "Name must be a string",
      status: 400,
    });
  }

  if (typeof age !== "number") {
    return res.status(400).send({
      message: "Age must be a number",
      status: 400,
    });
  }

  next();
};

module.exports = validate;
