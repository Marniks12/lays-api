const express = require("express");
const Bag = require("../models/Bag");
const auth = require("../middleware/authMiddleware");


const router = express.Router();

/**
 * POST /bag
 * create a bag (logged in user)
 */
router.post("/bag", auth, async (req, res) => {
  try {
    const bag = await Bag.create({
      ...req.body,
      user: req.user.id
    });
    res.json(bag);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Bag creation failed" });
  }
});

/**
 * GET /bag
 * get all bags
 */
router.get("/bag", async (req, res) => {
  const bags = await Bag.find().populate("user", "email firstName");
  res.json(bags);
});

/**
 * DELETE /bag/:id
 * admin only
 */
router.delete("/bag/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.sendStatus(403);
  }

  await Bag.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
