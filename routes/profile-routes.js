const express = require("express");
const router = express.Router();
const profileControllers = require("../controllers/profile-controllers");
const { authorize } = require("../middlewares/authorization");
const { upload } = require("../middlewares/Multer");

router
  .route("/")
  .get(authorize, profileControllers.getProfilesByUserId)
  .post(authorize, upload.single("image"),profileControllers.addProfile);

router
.route("/:profileID")
.get(authorize, profileControllers.getOneProfile)
.delete(authorize, profileControllers.deleteProfile)
.patch(authorize,upload.single("image"), profileControllers.updateProfile);
module.exports = router;
