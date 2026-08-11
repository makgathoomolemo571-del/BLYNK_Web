const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("../subscription/subscription.controller");

router.post("/", auth, controller.create);

router.patch("/upgrade", auth, controller.upgrade);

router.patch("/cancel", auth, controller.cancel);

router.get("/me", auth, controller.getMine);

module.exports = router;