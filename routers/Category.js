const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Getting All Teshirt
router.get("/", async (req, res) => {
  try {
    const getedcategory = await Category.find();
    res.json(getedcategory);
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send("Error: " + err.message);
  }
});

// Posting Category

router.post("/addCategory", async (req, res) => {
  try {
    let { name } = req.body;

    // const created_at = Date.now();

    const newCategory = new Category({
      name,
    });

    const addedcategory = await newCategory.save();
    res.json(addedcategory);
    console.log(addedcategory);
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send("Error: " + err.message);
  }
});

router.delete("/deleteCategory/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Category Data Deleted Successfully",
      deletedCategory,
    });
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send("Error: " + err.message);
  }
});

router.put("/editCategory/:id", async (req, res) => {
  try {
    const editCategory = await Category.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    const editedCategory = await editCategory.save();
    res.json(editedCategory);
  } catch (err) {
    console.log("Error: " + err.message);
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = router;
