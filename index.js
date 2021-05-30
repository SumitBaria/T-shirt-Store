const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const url = "mongodb://localhost/Tshirt";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
const con = mongoose.connection;

con.on("open", () => {
  console.log("Data base is Connected");
});

const userRouter = require("./routers/Users");
app.use("/user", userRouter);

const tshirtRouter = require("./routers/Tshirt");
app.use("/tshirt", tshirtRouter);

const categoryRouter = require("./routers/Category");
app.use("/category", categoryRouter);

app.listen(3001, () => {
  console.log("Server is up On port no: 3001!!!!");
});
