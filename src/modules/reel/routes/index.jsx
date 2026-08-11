const express = require("express");
const router = express.Router();

const controller = require("./reel.controller");
const auth = require("../../middleware/auth");

// Feed
router.get("/", controller.feed);

// Single reel
router.get("/:id", controller.getById);

// Create
router.post("/", auth, controller.create);

// Update
router.patch("/:id", auth, controller.update);

// Delete
router.delete("/:id", auth, controller.remove);

// Like / Unlike
router.post("/:id/like", auth, controller.like);
router.delete("/:id/like", auth, controller.unlike);

// Comment
router.post("/:id/comment", auth, controller.comment);

// Share
router.post("/:id/share", auth, controller.share);

// Save / Unsave
router.post("/:id/save", auth, controller.save);
router.delete("/:id/save", auth, controller.unsave);

// View
router.post("/:id/view", controller.view);

module.exports = router;