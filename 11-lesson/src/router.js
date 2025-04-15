const rt = require("express").Router();
const multer = require("multer");

const auth = require("express").Router();
const ac = require("./controller/auth.controller");
const av = require("./validation/auth.validation");
auth.post("/login", av.login, ac.login);

const uc = require("./controller/user.controller");
const uv = require("./validation/user.validation");
const upload = multer({});

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Too many requests, please try again later.",
  statusCode: 429,
});

rt.get("/users", limiter, uc.getUsers);
rt.post("/users", upload.single("img"), uv.createUser, uc.createUser);
rt.get("/users/:id", uv.getByID, uc.getUserById);
rt.put("/users/:id", uc.updateUser);

module.exports = { rt, auth };
