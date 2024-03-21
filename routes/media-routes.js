const express = require("express");
const router = express.Router();
const mediaControllers = require("../controllers/media-controllers");

router
    .route("/")
    .get()
    .post();

router
    .route("/:id")
    .get();

module.exports = router;