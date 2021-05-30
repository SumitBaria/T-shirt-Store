const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Users = require("../models/Users");
const auth = require("../middleware/auth");
// Getting All Users
// router.get("/", async (req, res) => {
//   try {
//     const users = await Users.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).send(err.msg);
//   }
// });

// Registration of New User
router.post("/register", async (req, res) => {
  try {
    let { name, email, password, passwordcheck, gender, phone } = req.body;

    // Validate
    if (!name || !email || !password || !passwordcheck || !gender || !phone) {
      return res.status(400).json({ msg: "Not all fields has been filled." });
    }

    if (password < 8) {
      return res
        .status(400)
        .json({ msg: "Password Must be Greater then 5 Charecters." });
    }

    if (password !== passwordcheck) {
      return res
        .status(400)
        .json({ msg: "Confirm Password Must be same as password" });
    }

    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ msg: "An account is already exist." });
    }

    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);

    // const created_at = Date.now();
    // const updated_at = Date.now();

    const newUser = new Users({
      name,
      email,
      password: hasedPassword,
      gender,
      phone,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send("Error: " + err.message);
  }
});

// Login For User
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ msg: "One Field is Null" });
    }

    const user = await Users.findOne({ email: email });
    console.log(user);

    if (!user) {
      res.status(400).json({ msg: "User does not Exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: "Password is not matching" });
    }

    const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).send(err.msg);
  }
});

// Delete User
// router.delete("/delete", auth, async (req, res) => {
//   try {
//     const user = await Users.findByIdAndDelete(req.user);
//     res.json({
//       user,
//       msg: "Deleted Successfully",
//     });
//   } catch (err) {
//     console.log("Error: " + err.message);
//     res.status(500).send("Error: " + err.message);
//   }

// tokenisValid

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (!verified) return res.json(false);

    const user = await Users.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).send(err.msg);
  }
});

// Geting User

// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await Users.findById(req.user);
//     res.json({
//       name: user.name,
//       id: user._id,
//     });
//   } catch (err) {
//     res.status(500).send(err.msg);
//   }
// });

module.exports = router;
