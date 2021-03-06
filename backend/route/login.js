const express = require("express");
//init
const router = express.Router();

//auth
//const { authorize } = require("../middleware/auth.js");

//joi schema
const { userLoginValidation } = require("../validation/user");

// //admin loggin
// router.post('/admin', userLoginValidation, adminAuth);

// //admin fresh
// router.post('/admin/fresh', userLoginValidation, adminFreshAuth);

//user
//router.post("/user", authorize); //userLoginValidation

//user fresh
//router.post("/user/fresh", userLoginValidation, authorize);

//404
router.use((req, res) => {
  res.status(404).send("404");
});

module.exports = router;
