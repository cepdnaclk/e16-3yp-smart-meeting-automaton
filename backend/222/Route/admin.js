const express = require('express')
//init
const router = express.Router();

//jwt
const jwt = require('jsonwebtoken');

//bcryptjs
const bcryptjs = require('bcryptjs');

//module administrator
const Administrator = require('../modules/administrator.model');

//module user
const userSchema = require('../modules/user.model');

//module request
const requestSchema = require('../modules/userRequest.model');

//module room
const roomschema = require('../modules/lecRoom.model');

//autheratazation
const {authAdmin, authUser, authAdminFresh} = require('../middleware/autherazation');

//validation
const {userValidation , userLoginValidation} = require('../validation/user'); 

//validation room
const {roomValidation} = require('../validation/room');

//auth
const { userFreshAuth } = require('../middleware/auth');

//email
const {sendMailVerification} = require('../middleware/email');

router.post('/adduser/list', authAdmin);

router.get('/requests', authAdmin, async(req, res)=>{
    requestSchema.find({}, (err, data) => {
        if(err)
        {
            console.log('Error in get room')
            req.status(401).send('Cannot find');

        }
        else{
            if(data){
                // console.log(data);
                res.status(200).json({
                    arry: data
                });
            }
            else{
                res.status(400).json({
                    'Error': 'No request'
                });
            }
        }
    });

});


router.post('/adduser/:id', authAdminFresh, (req, res)=>{
    // requestSchema.findOne({_id: req.params.id}, async(err, data)=>{
    requestSchema.findOneAndDelete({_id: req.params.id}, async(err, data)=>{
        if(err){
            res.status(400).json({
                'Error': 'Try again'
            });
        }else{
            if(data){
                const userNew = new userSchema({
                    username: data.username,
                    password: data.password,
                    email: data.email
                });
                try{
                    const usersaved = await userNew.save();
                    console.log('saved user to the db...');
                    const payload = {
                        user: {
                          id: usersaved._id
                        }
                    };
                    // const verifUrl = jwt.sign(usersaved._id, process.env.LOGIN_VARIFICATION_TOKEN, {expiresIn: '10m'});
                    const verifUrlToken = jwt.sign(payload, process.env.LOGIN_VARIFICATION_TOKEN, {expiresIn: '10m'});
                    const verifUrl = `http://localhost:3000/user/verify/${verifUrlToken}`;
                    console.log(verifUrl);
                    // sendMailVerification(whom=usersaved.email, url=verifUrl).then((data) => {
                    sendMailVerification(usersaved.email, verifUrl).then((data) => {
                        res.status(200).json({
                            'message': 'User added success'
                        });
                    }).catch((err)=>{
                        console.log(err);
                        res.status(400).json({
                            'Error': err
                        });
                    });

                   
                }catch(error)
                {
                    console.log('Saving faild...', error);
                    res.status(400).json({
                        'error': 'Saving error'
                    });
                
                }


            }else{
                res.status(400).json({
                    'Error': 'No such request'
                });
            }
        }
    });
});


router.post('/adduser/hh', authAdmin, userValidation, async(req, res) => {

    userSchema.findOne({email: req.body.email}, async (err, data)=>{
        if(err) res.status('400').send('Try again');
        else{

            if(data) res.status('400').send('email already exist');
            else{
                const salt = await bcryptjs.genSalt(10);
                const hashPassword = await bcryptjs.hash(req.body.password, salt);
                console.log(salt);
                console.log(hashPassword);
                const user = new userSchema({
                    username: req.body.username,
                    password: hashPassword,
                    email: req.body.email
                });
            
                try{
                    const userloged = await user.save();
                    console.log('saved user to the db...');
                    res.send(userloged);
                }catch(error)
                {
                    console.log('Saving faild...', error);
                    res.send({
                        'error': 'Saving error'
                    });
                
                }
            }

        }
    });

});

router.get('/table', authAdmin, async(req, res) => {
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


router.post('/addroom', authAdminFresh, roomValidation, async (req, res) => {

    roomschema.findOne({roomId: req.body.roomId}, async(err, data)=>{
        if(err){
            res.send('Try again...');
        }
        else{
            if(data){
                res.send('Already exist...');
            }
            else{
                const room = new roomschema({
                    roomId: req.body.roomId,
                    controlUnitId: req.body.controlUnitId,
                    meetingOwnerId: req.body.meetingOwnerId,
                    isReserved: req.body.isReserved
                });

                try{
                    const roomsaved = await room.save();
                    console.log('saved user to the db...');
                    res.send(roomsaved);
                }catch(error)
                {
                    console.log('Saving faild...', error);
                    res.send({
                        'error': 'Saving error'
                    });
                
                }
            }
        }
    });

});

router.get('/room/:id', authAdmin, async(req, res)=>{
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

router.delete('/deleteroom/:id', authAdminFresh, async(req,res)=>{
    // console.log(req.params.id);
    roomschema.findOneAndDelete({roomId: req.params.id},(err,data)=>{
        if(err)
        {
            console.log('No room with requested id')
            req.status(401).send('Cannot find');

        }
        else{
            if(data){
                res.send(data);
                console.log(data);
            }else{
                console.log('no room id', data);
                res.status(400).send('No room for id');
            }
        }
    });

});

router.delete('/removeuser/:id', authAdminFresh, async(req,res)=>{
    userSchema.findOneAndDelete({email: req.params.id},(err,data)=>{
        if(err)
        {
            console.log('No user with requested id')
            req.status(401).send('Cannot find');

        }
        else{
            if(data){
                res.send(data);
            }else{
                res.status(400).send('No user for id');
            }
        }
    });

});

//404
router.use((req, res)=>{
    res.status(404).send('404');
    console.log('4040');
});



module.exports = router;