const express = require('express')
//init
const router = express.Router();

//bcryptjs
const bcryptjs = require('bcryptjs');

//module administrator
const Administrator = require('../modules/administrator.model');

//module user
const userSchema = require('../modules/user.model');

//module room
const roomschema = require('../modules/lecRoom.model');

//autheratazation
const autheratazation = require('./autherazation');

//validation
const {userValidation } = require('../validation/user'); 

//validation room
const {roomValidation} = require('../validation/room');



router.post('/adduser', autheratazation.authAdmin, userValidation, async(req, res) => {
    // const authHeader = req.headers['auth'];
    // const token = authHeader && authHeader.split(' ')[1];
    // if(token == null) res.sendStatus(401);
    // const authToken = await autheratazation.authToken(token);
    // if(!authToken) return res.sendStatus(403);

    // const loginvalidate = uservalidation(req.body, (err, data) => {
    //     if(err) console.log('er');
    // });
    // if(loginvalidate.error){
    //     console.log('Error in validation...');
    //     res.status('400').send(loginvalidate);
    // }

    // const {err, findUser} = userSchema.findOne({email: req.body.email},(er, data)=>{
    //     if(er)
    // });
    // console.log(findUser);

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

router.get('/table', autheratazation.authAdmin, async(req, res) => {
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


router.post('/addroom', autheratazation.authAdmin, roomValidation, async (req, res) => {

    // try{
    //     const loginvalidate = await roomvalidation(req.body);
    // }
    // catch(err){
    //     console.log('Error in validation...');
    //     res.status('400').send(err);
    // }

    // const loginvalidate = await roomvalidation(req.body);
    // if(loginvalidate.error){
    //     console.log('err');
    //     res.send('error');
    // }
    // else{
    //     next();
    // }

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


    // const room = new roommodule({
    //     roomId: req.body.roomId,
    //     controlUnitId: req.body.controlUnitId,
    //     meetingOwnerId: req.body.meetingOwnerId,
    //     isReserved: req.body.isReserved
    // });

    

});

router.get('/room:id', autheratazation.authAdmin, async(req, res)=>{
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

router.delete('/deleteroom/:id', autheratazation.authAdmin, async(req,res)=>{
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

router.delete('/removeuser/:id', autheratazation.authAdmin, async(req,res)=>{
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