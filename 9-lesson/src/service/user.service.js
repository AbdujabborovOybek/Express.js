const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const crypto = require("crypto");
const mysql = require("../utils/mysql.helper");

class userService {
  async getUsers(req, res) {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await mysql.getAll("SELECT * FROM users");
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createUser(req, res) {
    return new Promise(async (resolve, reject) => {
      req.body.id = uuidv4();

      let sql = "SELECT * FROM users WHERE email = ?";
      let result = await mysql.getOne(sql, req.body.email);

      if (result) return resolve({ message: "User already exists" });

      const imgInfo = req.file || null;

      const imagesPath = path.join(__dirname, "../../public", "images");
      if (!fs.existsSync(imagesPath)) fs.mkdirSync(imagesPath);

      const imgFormat = imgInfo.mimetype.split("/").pop();
      const imgName = `${crypto.randomBytes(7).toString("hex")}.${imgFormat}`;

      sharp(imgInfo.buffer).resize(400, 400).toFile(`${imagesPath}/${imgName}`);

      sql = `INSERT INTO users SET ?`;
      await mysql.query(sql, { ...req.body, img: imgName });

      return resolve({ message: "User created successfully" });
    });
  }

  async getUserById() {}

  async updateUser() {}

  async deleteUser() {}
}

module.exports = new userService();
