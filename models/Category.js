const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  created_at: {
    type: String,
    require: true,
  },
});
