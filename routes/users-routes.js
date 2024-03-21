const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users-controllers");
const {validateSignUp} = require("../middlewares/signUp-validation");

router
    .route("/")
    .get(usersControllers.getUsers);

    router
    .route("/signup")
    .post(validateSignUp,usersControllers.addNewUser);



module.exports = router;