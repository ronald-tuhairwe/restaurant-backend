const express = require("express");
const router = express.Router();

const infoController = require("../controllers/informationController");

router.get("/", infoController.getInfo);

router.post("/", infoController.addInfo);

router.post("/contact", infoController.addcontactMesssage);

router.post("/bookTable", infoController.bookTable);



router.patch("/clear", infoController.clearInfo);


module.exports = router;