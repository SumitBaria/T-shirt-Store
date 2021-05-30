const express = require("express");
const router = express.Router();
const Tshirts = require("../models/Tshirts");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

router.get("/", async (req, res) => {
  try {
    const tshirts = await Tshirts.find();
    res.json(tshirts);
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send("Error: " + err.message);
  }
});

var storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join("./client/public/media"));
  },
  filename: (req, res, cb) => {
    cb(null, Date.now().toString() + "-" + res.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/addTshirt", upload.single("image"), async (req, res) => {
  try {
    let { name, price, offer, tranding, feature, category, gender, qunatity } =
      req.body;

    const imageName = req.file.filename;

    const newTshirt = new Tshirts({
      name,
      imageName,
      price,
      offer,
      tranding,
      feature,
      category,
      gender,
      qunatity,
    });

    const savedTshirt = await newTshirt.save();
    res.json(savedTshirt);
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send("Error: " + err.message);
  }
});

router.delete("/deleteTshirt/:id", async (req, res) => {
  try {
    const deletedTshirt = await Tshirts.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Tshirt Data Deleted Successfully",
      deletedTshirt,
    });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send("Error: " + err.message);
  }
});

router.put("/editTshirtData/:id", async (req, res) => {
  try {
    const updateTshirt = await Tshirts.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    const updatedTshirt = await updateTshirt.save();
    res.json({
      msg: "Tshirt Data Updated Successfully",
      updatedTshirt,
    });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send("Error: " + err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tshirt = await Tshirts.findById(req.params.id);
    res.json(tshirt);
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = router;
