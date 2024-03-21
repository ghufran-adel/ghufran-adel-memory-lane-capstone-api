const express = require("express");
const router = express.Router();
const profileControllers = require("../controllers/profile-controllers");

router
    .route("/")
    .get()
    .post();

router
    .route("/:id")
    .get();

module.exports = router;