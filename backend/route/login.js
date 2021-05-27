const express = require("express");
//init
const router = express.Router();

// auth
const { authorize, authorizeCU } = require("../middleware/auth-old");

//joi schema
const { userLoginValidation } = require("../validation/user");
const {CULoginValidation} = require("../validation/controlUnit");

//admin loggin userLoginValidation,
router.post('/admin', authorize);

//control unit login
router.post('/controlUnit', CULoginValidation, authorizeCU);

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
