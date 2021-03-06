//jwt
const { date } = require("@hapi/joi");
const jwt = require("jsonwebtoken");

//auth
// const auth = require('../middleware/auth');
// newuser
const newUser = require("../modules/newUser.model");

//bcryptjs
const bcryptjs = require("bcryptjs");

//module
const user = require("../modules/user.model");

async function authNewUser(req, res, next) {
  try {
    newUser.findOne({ userId: req.body.userId }, async (err, doc) => {
      if (err) {
        console.log("Error in db ");
        res.json({
          Error: "Try again...",
        });
      } else {
        if (doc) {
          try {
            const OTPValid = await bcryptjs.compare(req.body.OTP, doc.OTP);
            if (OTPValid) {
              next();
            } else {
              console.log("invalid otp");
              res.status(400).json({
                Error: "username or password wrong",
              });
            }
          } catch (error) {
            console.log("Error in function");
            res.status(400).json({
              Error: "Try again",
            });
          }
        } else {
          console.log("invalid otp");
          res.status(400).json({
            Error: "username or password wrong",
          });
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      Error: "Error",
    });
  }
}

async function authAdmin(req, res, next) {
  try {
    const authHeader = req.headers["x-auth-token"];
    const token = authHeader && authHeader.split(" ")[1]; //like <word> + <space> + token
    if (token == null)
      res.status(401).json({
        Error: "does not have token. authorization denied",
      });
    else {
      jwt.verify(token, process.env.LOGIN_TOKEN, (err, userByToken) => {
        if (err)
          res.status(401).json({
            Error: "Token not valid",
          });
        else {
          // console.log(userByToken);
          user.findById(userByToken.user.id, async (err, data) => {
            if (err)
              res.json({
                Error: "Try again...",
              });
            else {
              // console.log(data);
              if (data) {
                if (date.isAdmin) {
                  req.user = data._id;
                  next();
                } else {
                  res.status(400).json({
                    Error: "Unauthorized. Not a Admin",
                  });
                }
              } else {
                res.status(400).json({
                  Error: "Unauthorized",
                });
              }
            }
          });
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      Error: "Error",
    });
  }
}

async function authUser(req, res, next) {
  try {
    const authHeader = req.headers["x-auth-token"];
    const token = authHeader; //&& authHeader.split(' ')[1];
    if (token == null)
      res.status(401).json({
        Error: "does not have token. authorization denied",
      });
    else {
      jwt.verify(token, process.env.LOGIN_TOKEN, (err, userByToken) => {
        if (err)
          res.status(401).json({
            Error: "Token not valid",
          });
        else {
          User.findById(userByToken.user.id, async (err, data) => {
            if (err)
              res.json({
                Error: "Try again...",
              });
            else {
              if (data) {
                req.user = data._id;
                next();
              } else {
                res.status(400).json({
                  Error: "Unauthorized",
                });
              }
            }
          });
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      Error: "Error",
    });
  }
}

// async function authAdminFresh(req, res, next) {
//     try{
//         const authHeader = req.headers['x-auth-token'];
//         const token = authHeader && authHeader.split(' ')[1];   //like <word> + <space> + token
//         if(token == null) res.status(401).json({
//             'Error': 'does not have token. authorization denied'
//         });
//         else{
//             jwt.verify(token, process.env.LOGIN_FRESH_TOKEN, (err, userByToken) => {
//                 if(err) res.status(401).json({
//                     'Error': 'Token not valid'
//                 });
//                 else
//                 {
//                     Administrator.findById( userByToken.user.id, async(err, data)=>{
//                         if(err) res.json({
//                             'Error':'Try again...'
//                         });
//                         else{
//                             // console.log(data);
//                             if(data){
//                                 req.user = data._id;
//                                 next();

//                             }
//                             else{
//                                 res.status(400).json({
//                                     'Error':'not a admin'
//                                 });
//                             }
//                         }
//                     });
//                 }
//             });
//         }

//     }
//     catch(err){
//         res.status(500).json({
//             'Error': 'Error'
//         });
//     }

// }

// async function authUserFresh(req, res, next) {
//     try{
//         const authHeader = req.headers['x-auth-token'];
//         const token = authHeader && authHeader.split(' ')[1];   //like <word> + <space> + token
//         if(token == null) res.status(401).json({
//             'Error': 'does not have token. authorization denied'
//         });
//         else{
//             jwt.verify(token, process.env.LOGIN_FRESH_TOKEN, (err, userByToken) => {
//                 if(err) res.status(401).json({
//                     'Error': 'Token not valid'
//                 });
//                 else
//                 {
//                     User.findById( userByToken.user.id, async(err, data)=>{
//                         if(err) res.json({
//                             'Error':'Try again...'
//                         });
//                         else{
//                             if(data){
//                                 req.user = data._id;
//                                 next();

//                             }
//                             else{
//                                 res.status(400).json({
//                                     'Error':'not a User'
//                                 });
//                             }
//                         }
//                     });
//                 }
//             });
//         }

//     }
//     catch(err){
//         res.status(500).json({
//             'Error': 'Error'
//         });
//     }

// }

module.exports = {
  authAdmin,
  authUser,
  authNewUser,
};
