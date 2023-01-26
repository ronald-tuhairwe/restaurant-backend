const Info = require("../models/information");
const { ObjectId } = require("mongodb");

exports.addInfo = async (req, res, next) => {
  const newInfo = new Info(req.body);

  try {
    await newInfo.save();
    res.status(201).json({ success: true, data: newInfo });
  } catch (error) {
    res.status(201).json({ success: false, data: "Error saving info" });
  }
};

exports.addcontactMesssage = async (req, res, next) => {
  const message = req.body;

  try {
    await Info.updateOne(
      { _id: "63b35544ad544a46a4ddcafe" },
      {
        $push: { contact: message },
      }
    );

    res
      .status(200)
      .json({ success: true, data: "Your message was successfully sent" });
  } catch (error) {
    res
      .status(200)
      .json({ success: false, data: "Error in sending the message" });
  }
};

exports.bookTable = async (req, res, next) => {
  const message = req.body;
  // console.log(newFood, req.params);
  try {
    await Info.updateOne(
      { _id: "63b35544ad544a46a4ddcafe" },
      {
        $push: { bookTable: message },
      }
    );

    res
      .status(200)
      .json({ success: true, data: "Your Table is successfully booked" });
  } catch (error) {
    res
      .status(200)
      .json({ success: false, data: "Error in booking the table" });
  }
};

exports.clearInfo = async (req, res, next) => {
  try {
    await Info.updateOne(
      { _id: "63b35544ad544a46a4ddcafe" },
      {
        $set: { bookTable: [] },
      }
    );

    await Info.updateOne(
      { _id: "63b35544ad544a46a4ddcafe" },
      {
        $set: { contact: [] },
      }
    );

    res.status(200).json({ success: true, data: "All History was deleted" });
  } catch (error) {
    res.status(200).json({ success: false, data: "Error in deleting Hisory" });
  }
};

exports.getInfo = async (req, res, next) => {
  const info = await Info.find();
  res.status(200).json({ success: true, data: info });
};
