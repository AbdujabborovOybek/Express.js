const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

const validate = (schema, data) => {
  try {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (valid) return null;
    return !valid && validate.errors[0].message;
  } catch (error) {
    return error.message;
  }
};

module.exports = validate;
