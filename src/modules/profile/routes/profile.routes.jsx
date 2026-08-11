const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("../profile/profile.controller");

// PROFILE CORE
router.get("/me", auth, controller.getMyProfile);
router.get("/:id", auth, controller.getProfile);

// UPDATE PROFILE
router.patch("/update", auth, controller.updateProfile);

// PROFILE MEDIA
router.patch("/picture", auth, controller.updateProfilePicture);
router.patch("/banner", auth, controller.updateCoverBanner);

// PROFILE VISIBILITY
router.patch("/visibility", auth, controller.updateVisibility);

// PROFILE STATS
router.get("/:id/stats", auth, controller.stats);

module.exports = router;