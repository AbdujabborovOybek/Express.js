const validate = require("../utils/validate.helper");

class authValidation {
  async login(req, res, next) {
    const schema = {
      type: "object",
      properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", pattern: "^[a-zA-Z0-9]{5,15}$" },
      },
      required: ["email", "password"],
      additionalProperties: false,
      errorMessage: {
        type: "Data must be an object",
        required: {
          email: "Email is `required`",
          password: "Password is required",
        },
        properties: {
          email: "Email must be a string and email format",
          password: "Password must be a string and 5-15 characters",
        },
        additionalProperties: "Additional properties are not allowed",
      },
    };

    const result = validate(schema, req.body);
    if (result) return res.status(400).json({ message: result });
    next();
  }
}

module.exports = new authValidation();
