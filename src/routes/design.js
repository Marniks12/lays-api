const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Design = require("../models/Design");

// SAVE design (ingelogde user)
router.post("/", auth, async (req, res) => {
  try {
    const design = await Design.create({
      userId: req.user.id,
      bagColor: req.body.bagColor,
      pattern: req.body.pattern,
      chipsType: req.body.chipsType,
      previewImage: req.body.previewImage
    });

    res.json(design);
  } catch (err) {
    res.status(500).json({ message: "Failed to save design" });
  }
});

// 🔓 PUBLIC: designs ophalen voor voting (GEEN auth)
router.get("/public", async (req, res) => {
  const designs = await Design.find()
    .sort({ votes: -1 })
    .select("-__v");

  res.json(designs);
});

// 👍 VOTE
router.post("/:id/vote", async (req, res) => {
  const design = await Design.findById(req.params.id);
  if (!design) return res.sendStatus(404);

  design.votes += 1;
  await design.save();

  res.json({ votes: design.votes });
});

// 🔐 ADMIN: alles zien
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const designs = await Design.find().populate("userId", "email");
  res.json(designs);
});

// 🔐 ADMIN: delete
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  await Design.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
