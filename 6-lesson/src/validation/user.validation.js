const validate = require("../utils/validate.helper");

class userValidation {
  async createUser(req, res, next) {

    console.log(req.file);
    


    req.body = JSON.parse(JSON.stringify(req.body));

    const schema = {
      type: "object",
      properties: {
        name: { type: "string", minLength: 3, maxLength: 32 },
        brithday: { type: "string", format: "date" },
        email: { type: "string", format: "email" },
      },
      required: ["name", "brithday", "email"],
      additionalProperties: false,
      errorMessage: {
        type: "Malumot object bo'lishi kerak",
        required: {
          name: "Ismni kiritish shart",
          brithday: "Tug'ilgan kunni kiritish shart",
          email: "Emailni kiritish shart",
        },

        properties: {
          name: "Ism string va 3-32 belgidan iborat bo'lishi kerak",
          brithday: `Tug'ilgan kun string va sana formatida bo'lishi kerak (YYYY-MM-DD)`,
          email: "Email string va email formatida bo'lishi kerak",
        },

        additionalProperties: "Qo'shimcha xususiyatlar qo'llanilmaydi",
      },
    };

    const result = validate(schema, req.body);
    if (result) return res.status(400).json({ message: result });
    next();
  }
}

module.exports = new userValidation();
