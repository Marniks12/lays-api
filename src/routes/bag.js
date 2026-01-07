const express = require("express");
const Bag = require("../models/Bag");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * GET all bags
 */
router.get("/bag", auth, async (req, res) => {
  const bags = await Bag.find();
  res.json(bags);
});

/**
 * POST create bag
 */
router.post("/bag", auth, async (req, res) => {
  const bag = await Bag.create({
    name: req.body.name,
  });

  res.json(bag);
});

// 👍 VOTE OP DESIGN
router.post("/:id/vote", auth, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    design.votes += 1;
    await design.save();

    res.json({ votes: design.votes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Voting failed" });
  }
});


/**
 * DELETE bag
 */
router.delete("/bag/:id", auth, async (req, res) => {
  await Bag.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
