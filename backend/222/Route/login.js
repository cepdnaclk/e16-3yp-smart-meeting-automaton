const express = require('express')
//init
const router = express.Router();

//bcryptjs
const bcryptjs = require('bcryptjs');

//auth
const {adminAuth, userAuth, userFreshAuth, adminFreshAuth} = require('./auth');

//joi
const joi = require('@hapi/joi');
//joi schema
const {userValidation, userLoginValidation} = require('../validation/user'); 

//module administrator
const Administrator = require('../modules/administrator.model');

//autheratazation
const autheratazation = require('./autherazation');

//admin loggin
router.post('/admin', userLoginValidation, adminAuth);

//admin fresh
router.post('/admin/fresh', userLoginValidation, adminFreshAuth);

//user
router.post('/user', userLoginValidation, userAuth);

//user fresh
router.post('/user/fresh', userLoginValidation, userFreshAuth);

//404
router.use((req, res)=>{
    res.status(404).send('404');
});




module.exports = router;



