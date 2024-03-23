const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users-controllers");
const { authorize } = require("../middlewares/authorization");
const { validateSignUp } = require("../middlewares/signUp-validation");


router
.route("/").get(authorize, usersControllers.getUser);

router
.route("/signup").post(validateSignUp, usersControllers.addNewUser);

router
.route("/login").get(usersControllers.logIn);

module.exports = router;
