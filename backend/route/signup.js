const express = require('express')
//init
const router = express.Router();
//bcryptjs
const bcryptjs = require('bcryptjs');
//validation
const {userValidation } = require('../validation/user');
//userRequest model
const userRequestSchema = require('../modules/userRequest.model');

//user
const userSchema = require('../modules/user.model');
// checkExist,
router.post('/request', userValidation, async(req, res)=>{
    console.log(req.body.email);
    
    userSchema.findOne({email: req.body.email}, (err, data)=>{
        console.log('here');
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
                userRequestSchema.findOne({email: req.body.email}, async(err, dataInRequests)=>{
                    if(err){
                        res.status(500).json({
                            'Error': 'Error in server side'
                        });
                    }else{
                        if(dataInRequests){
                            res.status(400).json({
                                'Error': 'Already requested awit untill admin accept'
                            });
                        }else{
                            const salt = await bcryptjs.genSalt(10);
                            const hashPassword = await bcryptjs.hash(req.body.password, salt);
                            const requestForUser = new userRequestSchema({
                                username: req.body.username,
                                password: hashPassword,
                                email: req.body.email
                            });
                        
                            try{
                                const userRequested = await requestForUser.save();
                                console.log('saved user to the db...');
                                res.status(200).json({
                                    'message': 'Successfully requested'
                                });
                            }catch(error)
                            {
                                console.log('Requesting saving faild...', error);
                                res.status(400).json({
                                    'Error': 'Request Saving error'
                                });
                            
                            }
                        }

                    }

                });

            }
        }
    });

});


module.exports = router;