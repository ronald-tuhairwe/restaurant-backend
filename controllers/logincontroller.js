const User = require("../models/users");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let SECRET;

exports.authenticate = (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");
  try {
    let permission = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    res.status(400).json({ success: false, data: "Invalid JWT" });
  }
};

exports.test = (req, res, next) => {
  res.status(200).send("It worked");
};
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  SECRET = "login key for Angular";
  const user = await User.findOne({ email: email });
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        SECRET
      );
      res.status(200).json({ success: true, data: accessToken });
    } else {
      res
        .status(400)
        .json({ success: false, data: "wrong password or username" });
    }
  } else {
    res
      .status(400)
      .json({ success: false, data: "wrong password or username" });
  }
};

exports.signup = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const newUser = new User(req.body);
  newUser.orders = [];
  newUser.role = "customer";
  try {
    await newUser.save();
    res.status(201).json({ success: true, data: "New user has been created" });
  } catch (error) {
    res.status(201).json({ success: true, data: "not unique username" });
  }
};

exports.signupAdmin = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const newUser = new User(req.body);
  newUser.orders = [];
  newUser.role = admin;
  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(201).json({ success: true, data: "not unique username" });
  }
};

exports.deleteAccount = async (req, res, next) => {
  const id = ObjectId(req.params.userId);
  console.log(id);

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: "Acoount  deleted" });
  } catch (error) {
    res.status(200).json({ success: false, data: "Error deleting Account" });
  }
};

exports.addOrder = async (req, res, next) => {
  const order = req.body;
  // console.log(newFood, req.params);
  try {
    await User.updateOne(
      { _id: req.params.userId },
      {
        $push: { orders: order },
        $currentDate: {
          lastModified: true,
          "orderDate.date": { $type: "timestamp" },
        },
      }
    );

    res.status(200).json({ success: true, data: "order updated" });
  } catch (error) {
    res.status(200).json({ success: false, data: "Error updating order" });
  }
};

exports.getAllCustomers = async (req, res, next) => {
  const users = await User.find({ role: "customer" });
  res.status(200).json({ success: true, data: users });
};
