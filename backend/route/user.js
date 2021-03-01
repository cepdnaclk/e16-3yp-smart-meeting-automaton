const express = require('express')
//init
const router = express.Router();

//bcryptjs
const bcryptjs = require('bcryptjs');

//module administrator
const Administrator = require('../modules/administrator.model');

//module user
const userSchema = require('../modules/user.model');

// //for now //
// ///////////////////////////////////////////////////////////
// const userrequest = require('../modules/userRequest.model');
// /////////////////////////////////////////////////////////

//module room
const roomschema = require('../modules/lecRoom.model');

//autheratazation
const {authUser, authUserFresh} = require('../middleware/autherazation');

//validation
const {userValidation } = require('../validation/user'); 

//email
const {sendMailVerification} = require('../middleware/email');

//validation room
const {roomValidation} = require('../validation/room');

//jwt
const jwt = require('jsonwebtoken');

//calendar api
const {getEvent, addEvent, editEvent, deleteEvent} = require('../middleware/calendarApi');


router.get('/verify', authUser, async(req, res)=>{
    userSchema.findById(req.user, async(err, userinfo)=>{
        if(err){
            res.status(400).json({
                'Error': 'Try again'
            });
        }else{
            if(userinfo){
                if(userinfo.verified){
                    res.status(400).json({
                        'Error': 'Already verified'
                    });
                }else{

                    const payload = {
                        user: {
                          id: userinfo._id
                        }
                    };
                    // const verifUrl = jwt.sign(usersaved._id, process.env.LOGIN_VARIFICATION_TOKEN, {expiresIn: '10m'});
                    const verifUrlToken = jwt.sign(payload, process.env.LOGIN_VARIFICATION_TOKEN, {expiresIn: '10m'});
                    const verifUrl = `http://localhost:3000/user/verify/${verifUrlToken}`;
                    console.log(verifUrl);
                    // sendMailVerification(whom=usersaved.email, url=verifUrl).then((data) => {
                    sendMailVerification(userinfo.email, verifUrl).then((data) => {
                        res.status(200).json({
                            'message': 'Email send success'
                        });
                    }).catch((err)=>{
                        console.log(err);
                        res.status(400).json({
                            'Error': err
                        });
                    });

                }

            }else{
                res.status(400).json({
                    'Error': 'No user found'
                });
            }
        }
    });
    
});

//get schedul happen now
router.get('/get/schedule/custom', authUser, async(req, res)=>{

});

//get schedule from now to end of the day
router.get('/get/schedule/today', authUser, async(req, res)=>{
    const {error, resultCalApi} = await getEvent();
    if(error){
        res.status(400).json({
            'Error': 'Try again : ' + error 
        });
    }
    else{
        if(resultCalApi){
            try {
                var idList = [];
                resultCalApi.forEach(element => {
                    idList.push(element.data.id);
                    
                });

                scheduleschema.find({
                        _id : {
                            $in : idList
                        },
                        userName: req.user

                    }).sort({startTime: 1}).exec(function(err, docs) { 
                        if(err){
                            res.status(400).json({
                                'Error': 'Try again'
                            });
                        }
                        else{
                            res.send(docs);
                        }
                    });
                
            } catch (error) {
                console.log('Saving faild...', error);
                res.send({
                    'Error': 'Data base error : ' + error
                });
                
            }
            
        }
    }
});

router.get('/verify/:token', async(req, res)=>{
    jwt.verify(req.params.token, process.env.LOGIN_VARIFICATION_TOKEN, (err, userByToken) => {
        if(err) res.status(401).json({
            'Error': 'Token not valid'
        });
        else
        {
            userSchema.findByIdAndUpdate( userByToken.user.id, { verified: true}, async(err, data)=>{
                if(err) res.json({
                    'Error':'Try again...'
                });
                else{
                    // console.log(data);
                    if(data){
                        req.user = data._id;
                        // console.log(data);
                        res.status(200).json({
                            'masseage': 'Successfully verify'
                        });

                    }
                    else{
                        res.status(400).json({
                            'Error':'not a admin'
                        });
                    }
                }
            });
        }
    });
});



router.get('/table', authUser, async(req, res) => {
    roomschema.find({}, (err, data) => {
        if(err)
        {
            console.log('Error in get room')
            req.status(401).send('Cannot find');

        }
        
        console.log('Send data');
        res.send(data);
    });
});

router.get('/room/:id', authUser, async(req, res)=>{
    roomschema.findOne({roomId: req.params.id}, (err, data)=>{
        if(err)
        {
            console.log('Error in get room')
            req.status(401).send('Cannot find');

        }
        else{
            if(data){
                res.send(data);
            }else{
                res.status(400).send('No room for id');
            }
        }
    });
});

router.post('/add/room', )


//404
router.use((req, res)=>{
    res.status(404).send('404');
});

module.exports = router;
