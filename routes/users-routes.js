const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users-controllers");

router
    .route("/")
    .get()
    .post();

router
    .route("/:id")
    .get();

module.exports = router;