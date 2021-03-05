const express = require('express')
//init
const router = express.Router();
//bcryptjs
const bcryptjs = require('bcryptjs');
//validation
const {userValidation } = require('../validation/user');
//user
const userSchema = require('../modules/user.model');

//auth
const {authNewUser} = require('../middleware/authenticate');

//newuser
const newUserschema = require('../modules/newUser.model');

//////////////////////////////////////////////

// router.post('/adding', async(req, res)=>{
//     const salt = await bcryptjs.genSalt(10);
//     const hashPassword = await bcryptjs.hash(req.body.password, salt);
//     const newusr = new userSchema({
//         userName: req.body.userName,
//         password: hashPassword,
//         email: req.body.email,
//         userId: req.body.userId,
//         phone: req.body.phone,
//         isAdmin: true
//     });

//     try {
//         const saved = await newusr.save();
//         console.log(k);
//         if(err){
//             console.log('Requesting saving faild...', error);
//             res.status(400).json({
//                 'Error': 'Request Saving error'
//             });
//         }
//         else{
//             console.log('saved user to the db...');
//             res.status(200).json({
//                 'message': 'Successfully signin' + err
//             });
//         }
        
//     } catch (error) {
//         console.log('Requesting saving faild...', error);
//         res.status(400).json({
//             'Error': 'Request Saving error'
//         });
//     }
// });

//authNewUser,
router.post('/newuser',  userValidation, async(req, res)=>{
    // console.log(req.body.email);
    try {
        userSchema.findOne({userId: req.body.userId}, async(err, data)=>{
            // console.log('here');
            if(err){
                res.status(500).json({
                    'Error': 'Error in server side'
                });
            }else{
                if(data){
                    res.status(400).json({
                        'Error': 'User already exist'
                    });
                }else{
                    try {
                        newUserschema.findOne({userId: req.body.userId}, async(err, dataInNewUser)=>{
                            if(err){
                                res.status(500).json({
                                    'Error': 'Error in server side'
                                });
                            }else{
                                if(dataInNewUser){
                                    try {
                                        newUserschema.findOneAndDelete({userId: req.body.userId}, async(err, doc)=>{
                                            if(err){
                                                res.status(500).json({
                                                    'Error': 'Error in server side'
                                                }); 
                                            }
                                            else{
                                                const salt = await bcryptjs.genSalt(10);
                                                const hashPassword = await bcryptjs.hash(req.body.password, salt);
                                                const newusr = new userSchema({
                                                    userName: req.body.userName,
                                                    password: hashPassword,
                                                    email: req.body.email,
                                                    userId: req.body.userId,
                                                    phone: req.body.phone
                                                });
            
                                                try {
                                                    const reslt = await newusr.save();
                                                    console.log('saved user to the db...');
                                                    res.status(200).json({
                                                        'message': 'Successfully signin' + reslt
                                                    });
                                                    
                                                } catch (error) {
                                                    console.log('Requesting saving faild...', error);
                                                    res.status(400).json({
                                                        'Error': 'Request Saving error'
                                                    });
                                                }
            
                                            }
                                        });
        
                                    } catch (error) {
                                        console.log('Error in conncting db..');
                                        res.status(500).json({
                                            'Error': 'Error in server side'
                                        });
                                    }
                                }else{
                                    console.log('Error in signup');
                                    res.status(400).json({
                                        'Error': 'meet admin first'
                                    });
                                }
        
                            }
        
                        });
    
                    } catch (error) {
                        console.log('Error in conncting db..');
                        res.status(500).json({
                            'Error': 'Error in server side'
                        });
                    }
    
                }
            }
        });

    } catch (error) {
        console.log('Error in conncting db..');
        res.status(500).json({
            'Error': 'Error in server side'
        });
    }

});

// router.post('/newuser', userValidation, async(req, res)=>{
//     console.log(req.body.email);
    
//     userSchema.findOne({userId: req.body.userId}, async(err, data)=>{
//         // console.log('here');
//         if(err){
//             res.status(500).json({
//                 'Error': 'Error in server side'
//             });
//         }else{
//             if(data){
//                 res.status(400).json({
//                     'Error': 'User already exist'
//                 });
//             }else{
//                 newUserschema.findOne({userId: req.body.userId}, async(err, doc)=>{
//                     if(err){
//                         res.status(500).json({
//                             'Error': 'Error in server side'
//                         });
//                     }else{
//                         if(doc){

//                             res.status(400).json({
//                                 'Error': 'Already requested awit untill admin accept'
//                             });
//                         }else{
//                             const salt = await bcryptjs.genSalt(10);
//                             const hashPassword = await bcryptjs.hash(req.body.password, salt);
//                             const requestForUser = new userRequestSchema({
//                                 username: req.body.username,
//                                 password: hashPassword,
//                                 email: req.body.email
//                             });
                        
//                             try{
//                                 const userRequested = await requestForUser.save();
//                                 console.log('saved user to the db...');
//                                 res.status(200).json({
//                                     'message': 'Successfully requested'
//                                 });
//                             }catch(error)
//                             {
//                                 console.log('Requesting saving faild...', error);
//                                 res.status(400).json({
//                                     'Error': 'Request Saving error'
//                                 });
                            
//                             }
//                         }

//                     }

//                 });

//             }
//         }
//     });

// });


module.exports = router;