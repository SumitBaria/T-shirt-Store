const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = require("../models/Users");

// Getting All Users
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.msg);
  }
});

// Registration of New User
router.post("/register", async (req, res) => {
  try {
    let { name, email, password, passwordCheck, gender, phone } = req.body;

    // Validation
    if (!name || !email || !password || !passwordCheck || !gender || !phone) {
      res.status(400).json({ msg: "Not all field has been filled" });
    }

    if (password <= 8) {
      res.status(400).json({ msg: "Password Must be 8 Character Long" });
    }

    if (password !== passwordCheck) {
      res.status(400).json({ msg: "Please Check! Password is not matching" });
    }

    const existingUser = await Users.find({ email: email });

    if (existingUser) {
      res.status(400).json({ msg: "Email Address is already exist" });
    }

    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);

    const created_at = Date.now();
    const updated_at = Date.now();

    const newUser = new Users({
      name,
      email,
      password: hasedPassword,
      gender,
      phone,
      created_at,
      updated_at,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).send(err.msg);
  }
});

// Login For User

router.post("/login", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).send(err.msg);
  }
});

module.exports = router;
