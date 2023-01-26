"use strict";
/*eslint-disable */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const foodRouter = require("./routes/foodRouter");
const infoRouter = require("./routes/informationRouter");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const jwt = require("jsonwebtoken");
let SECRET;

const authenticate = (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");
  try {
    let permission = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    res.status(400).json({ success: false, data: "Invalid JWT" });
  }
};

app.use("/", userRouter);
app.use("/foods", foodRouter);
app.use("/info", infoRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, data: err.message });
});

mongoose.connect("mongodb+srv://restaurant:Tronnie33@cluster0.edzv8dj.mongodb.net/?retryWrites=true&w=majority").then(() => {
  console.log("############## DataBase Connected ! ###################");
  console.log("                    -------------");

  app.listen(process.env.PORT || 8000, () => {
    console.log(
      "*************** Am Listening at port 3000 *********************************"
    );
  });
});
