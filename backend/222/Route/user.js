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



router.get('/table', autheratazation.authUser, async(req, res) => {
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

router.get('/room:id', autheratazation.authUser, async(req, res)=>{
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


//404
router.use((req, res)=>{
    res.status(404).send('404');
});

module.exports = router;
