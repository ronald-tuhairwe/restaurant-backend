const express = require("express");
const router = express.Router();

const logincontroller = require("../controllers/logincontroller");

router.get("/", logincontroller.test);
router.post("/login", logincontroller.login);
//http://localhost:3000/login
router.post("/signup", logincontroller.signup);
//http://localhost:3000/signup
router.patch("/order/:userId", logincontroller.addOrder);
router.get("/customers", logincontroller.getAllCustomers);
//http://localhost:3000/customers
router.delete("/user/:userId",  logincontroller.deleteAccount);
//http://localhost:3000/user/63a8fa8d2a4a71ab50c142c7

router.post("/signupAdmin", logincontroller.signupAdmin);
//http://localhost:3000/signupAdmin
// router.get("/authenticate", logincontroller.authenticate);

module.exports = router;
