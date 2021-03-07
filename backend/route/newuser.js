const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../modules/user.model");
const Newuser = require("../modules/newUser.model");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const newUsers = await Newuser.find();
    res.json(newUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
//admin  add new user
router.post("/", async (req, res, next) => {
  //   const name = "No1";
  //   const status = "1";
  //   const lastConfigDate = new Date();
  console.log("REGISER USER");
  try {
    const userId = req.body.workerId;
    const name = req.body.name;
    const email = req.body.email;
    // const address1 = req.body.newuser.address1;
    // const address2 = req.body.newuser.address2;
    // const address3 = req.body.newuser.address3;
    const phone = req.body.phone;
    const onetimeId = req.body.onetimeId;

    console.log(name);
    console.log(email);
    console.log(userId);
    console.log(onetimeId);

    const exnewuser = await User.findOne({ userId });

    if (exnewuser) return res.status(400).json({ msg: "User already exists." });

    const exuser = await Newuser.findOne({ userId });

    if (exuser) return res.status(400).json({ msg: "User already exists." });

    console.log("test");
    const newuser = new Newuser({
      userId,
      email,
      name,
      // address1,
      // address2,
      // address3,
      phone,
      onetimeId,
    });
    console.log("test2");

    await newuser.save();
    console.log("test3");
    res.json({ msg: "User Added" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
});
//user firsttime registration
router.post(
  "/register",

  [
    check("onetimeId", "Please include a valid ID").exists(),
    check("workerId", "Working ID is required").exists(),
    check("password", "Password is required")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    // .custom((value, { req }) => {
    //   if (value !== req.body.password2) {
    //     throw new Error("Password confirmation is incorrect");
    //   }
    // }),
  ],

  async (req, res, next) => {
    console.log("user Firstime reg");
    console.log(req.body.workerId);
    try {
      const userId = req.body.workerId;
      const password = req.body.password;
      const onetimeId = req.body.onetimeId;
      // const address1 = req.body.address1;
      // const address2 = req.body.address2;
      // const address3 = req.body.address3;
      const phone = req.body.phone;
      // console.log(email);
      // console.log(req.body);

      const exuser = await Newuser.findOne({ userId });

      if (!exuser)
        return res.status(400).json({
          msg: "You are not Authorize to system.Please inform to Admirn",
        });

      console.log(exuser);
      if (onetimeId !== exuser.onetimeId) {
        console.log("oentimeidfucked");

        return res.status(400).json({
          msg: "You are not Authorize to system.Please inform to Admin",
        });
      }
      // console.log(exuser);

      console.log("www");

      const { email, name } = exuser;
      console.log(email);

      const salt = await bcrypt.genSalt(10);

      const newuser = new User({
        userId,
        email,
        password,
        name,

        // address1,
        // address2,
        // address3,
        phone,
      });
      newuser.password = await bcrypt.hash(password, salt);
      console.log("sdasd");
      await newuser.save();
      console.log("save");
      await Newuser.deleteOne({ userId });
      res.json({ msg: "You are Registerd Please Loging to system" });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  }
);
module.exports = router;
