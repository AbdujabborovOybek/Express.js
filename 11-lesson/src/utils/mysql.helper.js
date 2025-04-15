const mysql2 = require("../config/mysql2.config");

class mysql {
  async getOne(query, params) {
    try {
      const result = await mysql2.query(query, params);
      return result[0].length ? result[0][0] : null;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(query, params) {
    try {
      const result = await mysql2.query(query, params);
      return result[0].length ? result[0] : null;
    } catch (error) {
      console.log(error);
    }
  }

  async query(query, params) {
    try {
      const result = await mysql2.query(query, params);
      if (result[0].affectedRows) return null;
      return "Failed";
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new mysql();
