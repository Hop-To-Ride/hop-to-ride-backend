const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");

const authenticationController = require("../controllers/authenticationController");

router.get("/", authenticationController.getUsers);

router.post("/register", authenticationController.register);

router.post("/registerAsDriver", authenticationController.registerAsDriver);

router.post("/login", authenticationController.login);

module.exports = {
  router,
};
