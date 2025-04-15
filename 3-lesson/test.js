const crypto = require("crypto");
const code = crypto.randomInt(100000, 999999);
console.log(code);
