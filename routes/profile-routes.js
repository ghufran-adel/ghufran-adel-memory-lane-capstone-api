const express = require("express");
const router = express.Router();
const profileControllers = require("../controllers/profile-controllers");
const { authorize } = require("../middlewares/authorization");

router
  .route("/")
  .get(authorize, profileControllers.getProfilesByUserId)
  .post(authorize, profileControllers.addProfile);

router.route("/:profileID").get(authorize, profileControllers.getOneProfile);

module.exports = router;
