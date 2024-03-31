const express = require("express");
const router = express.Router();
const milestonesControllers = require("../controllers/milestones-controllers");
const { authorize } = require("../middlewares/authorization");
const { upload } = require("../middlewares/Multer");
const {validateMilestoneData} =require('../middlewares/validateMilestoneData');



router
    .route("/:profileId")
    .get( authorize , milestonesControllers.getMilestones )
    .post(authorize ,upload.array("media"), validateMilestoneData, milestonesControllers.addMilestone);

router
    .route("/:profileId/:milestoneId")
   .get(authorize ,milestonesControllers.getOneMilestone)
   .delete(authorize ,milestonesControllers.deleteOneMilestone)


module.exports = router;