const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,  
      password: hash
    });

    res.json(user);
  } catch (err) {
  console.error("USER CREATE ERROR:", err.message);

  res.status(500).json({
    message: err.message,
    error: err
  });
}

});

router.post("/user/auth", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(401);

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.sendStatus(401);

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

module.exports = router;
