const { v4: uuidv4 } = require("uuid");
const mysql = require("../utils/mysql.helper");

class log {
  async write(req, info) {
    return new Promise(async (resolve, reject) => {
      try {
        const set = {
          id: uuidv4(),
          info: info,
          method: req.method,
          endpoint: req.originalUrl,
        };

        const sql = `INSERT INTO logs SET ?`;
        const result = await mysql.query(sql, set);
        console.log(result);
        

        resolve("Success");
      } catch (error) {
        resolve("Failed");
      }
    });
  }
}

module.exports = new log();
