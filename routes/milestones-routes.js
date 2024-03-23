const express = require("express");
const router = express.Router();
const milestonesControllers = require("../controllers/milestones-controllers");
const { authorize } = require("../middlewares/authorization");

router
    .route("/:profileId")
    .get( authorize , milestonesControllers.getMilestones )
//     .post();

router
    .route("/:profileId/:milestoneId")
   .get(authorize ,milestonesControllers.getOneMilestone)

//     .patch()
//     .delete();

module.exports = router;