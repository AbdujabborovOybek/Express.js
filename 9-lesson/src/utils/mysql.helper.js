const mysql2 = require("../config/mysql2.config");

class mysql {
  async getOne(query, params) {
    const result = await mysql2.query(query, params);
    return result[0].length ? result[0][0] : null;
  }

  async getAll(query, params) {
    const result = await mysql2.query(query, params);
    return result[0].length ? result[0] : null;
  }

  async query(query, params) {
    const result = await mysql2.query(query, params);
    if (result[0].affectedRows) return null;
    return "Failed";
  }
}

module.exports = new mysql();
