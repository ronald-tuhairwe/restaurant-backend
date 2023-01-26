const express = require("express");
const router = express.Router();

const foodController = require("../controllers/foodController");

router.get("/", foodController.getAllfoods);
//http://localhost:3000/foods
router.post("/", foodController.addFood);
//http://localhost:3000/foods
router.get("/food/:foodId", foodController.getFoodById);
//localhost:3000/foods/food/63a8f64c8d465b4d5d136ed8
router.delete("/food/:foodId", foodController.deleteFood);
//http://localhost:3000/foods/food/63a8cfe14c1b920ab1147b83
router.patch("/food/:foodId", foodController.updateFood);

module.exports = router;
