const express = require("express");
const router = express.Router();

const User = require("../modules/user.model");
const Newuser = require("../modules/newUser.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
// const User = require("../models/User");
// const authctrl = require("../controllers/authCtrl");

//@route   GET api/auth
//@desc    Get logged in user
//@access  Private
router.get("/", auth, async (req, res) => {
  console.log("GET USER");
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
    //res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//@route   POST api/auth
//@desc    Auth user & get token
//@access  Public
router.post(
  "/",
  [
    check("workerId", "Please include a valid ID").exists(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { workerId, password } = req.body;
    const userId = workerId;

    try {
      let user = await User.findOne({ userId });
      if (!user || user.length == 0) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

     const isMatch = await bcrypt.compare(password, user.password);
      
      // let isMatch = false;
      // if (password === user.password) {
      //   isMatch = true;
      // }
      // console.log(user)
      // console.log("asdasdasd")
      // console.log(user.password);
      // console.log("sdfsdfsdfsdf");
      // console.log(password);

      if (!isMatch) {
        //!isMatch
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      console.log(user._id);
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        process.env.LOGIN_TOKEN,
        {
          expiresIn: 360000, //360000 s
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); /////////////////////////////////////////////////////////
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

// //user firsttime registration
// router.post(
//   "/addder",

//   async (req, res, next) => {
//     // console.log(req.body.workerId);
//     try {
//       const userId = "Admin";
//       const name = "Admin";
//       const password = "12345";
//       const email = "diwangaamasith@gmail.com";
//       //const onetimeId = req.body.onetimeId;
//       // const address1 = req.body.address1;
//       // const address2 = req.body.address2;
//       // const address3 = req.body.address3;
//       const role = 1;
//       const phone = "0776029720";
//       const salt = await bcrypt.genSalt(10);
//       user = new User({
//         name,
//         email,
//         password,
//         phone,
//         role,
//       });
//       user.password = await bcrypt.hash(password, salt);

//       await user.save();
//       // console.log(email);
//       // console.log(req.body);

//       // const exuser = await Newuser.findOne({ userId });

//       // if (!exuser)
//       //   return res.status(400).json({
//       //     msg: "You are not Authorize to system.Please inform to Admirn",
//       //   });

//       // console.log(exuser);
//       // if (onetimeId !== exuser.onetimeId)
//       //   return res.status(400).json({
//       //     msg: "You are not Authorize to system.Please inform to Admin",
//       //   });
//       // console.log(exuser);

//       console.log("www");
//     } catch (err) {
//       return res.status(500).json({ msg: err });
//     }
//   }
// );

module.exports = router;
