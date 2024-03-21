const express = require("express");
const router = express.Router();
const milestonesControllers = require("../controllers/milestones-controllers");

router
    .route("/")
    .get()
    .post();

router
    .route("/:id")
    .get()
    .post()
    .patch()
    .delete();

module.exports = router;