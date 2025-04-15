const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const crypto = require("crypto");

class userService {
  async getUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const file = path.join(__dirname, "./data.json");
        const users = JSON.parse(fs.readFileSync(file, "utf8"));
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createUser(req, res) {
    return new Promise(async (resolve, reject) => {
      req.body.id = uuidv4();

      const imgInfo = req.file || null;

      const imagesPath = path.join(__dirname, "../../public", "images");
      if (!fs.existsSync(imagesPath)) fs.mkdirSync(imagesPath);

      const imgFormat = imgInfo.mimetype.split("/").pop();
      const imgName = `${crypto.randomBytes(7).toString("hex")}.${imgFormat}`;

      sharp(imgInfo.buffer).resize(400, 400).toFile(`${imagesPath}/${imgName}`);

      const file = path.join(__dirname, "./data.json");
      const users = JSON.parse(fs.readFileSync(file, "utf8"));
      users.push({ ...req.body, img: imgName });
      fs.writeFileSync(file, JSON.stringify(users, null, 2));

      resolve({ message: "User created successfully" });
    });
  }

  async getUserById() {}

  async updateUser() {}

  async deleteUser() {}
}

module.exports = new userService();
