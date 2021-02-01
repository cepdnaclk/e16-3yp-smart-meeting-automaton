const express = require('express')
//init
const router = express.Router();

//bcryptjs
const bcryptjs = require('bcryptjs');

//auth
const auth = require('./auth');

//joi
const joi = require('@hapi/joi');
//joi schema
const {userValidation } = require('../validation/user'); 

//module administrator
const Administrator = require('../modules/administrator.model');

//autheratazation
const autheratazation = require('./autherazation');

router.post('/admin', userValidation, auth.adminAuth, (req, res) => {

    //res.send(req.accessToken);
    //check exist
    // const userAuth = await auth.adminAuth(req.body);
    // console.log(userAuth);
    
    
    // .then(() => {
    //         console.log(userAuth);
    //         if(!userAuth) return res.status('400').send('Email or password wrong');
    //         else{
    //             const accessToken = autheratazation.getToken(req.body);
    //             res.send({ accessToken : accessToken});
    //         }
    //     }
        
    // );
    


    // const loginvalidate = userValidation(req.body);
    // res.send(loginvalidate);
    // console.log('HEy');
    // if(loginvalidate.error){
    //     console.log('Error in validation...',loginvalidate);
    //     res.status('400').send(loginvalidate);
    // }

    //check exist
    // const userAuth = await auth.adminAuth(req.body);

    // if(!userAuth) return res.status('400').send('Email or password wrong');

    // const accessToken = autheratazation.getToken(req.body);
    
    // res.send({ accessToken : accessToken});



    // const salt = await bcryptjs.genSalt(10);
    // const pss = await bcryptjs.hash(req.body.password, salt);

});

//user
router.post('/user', userValidation, auth.userAuth, async(req, res) => {
    // const loginvalidate = uservalidation(req.body);
    // console.log(loginvalidate);
    // if(loginvalidate.error){
    //     console.log('Error in validation...',loginvalidate);
    //     res.status('400').send(loginvalidate);
    // }

    // //check exist
    // const userAuth = await auth(req.body);

    // if(!userAuth) return res.status('400').send('Email or password wrong');

    // const accessToken = autheratazation.getToken(req.body);
    
    // res.send({ accessToken : accessToken});
        
});

//404
router.use((req, res)=>{
    res.status(404).send('404');
});




module.exports = router;



