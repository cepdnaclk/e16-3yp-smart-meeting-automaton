//bcryptjs
const bcryptjs = require('bcryptjs');

//jwt
const jwt = require('jsonwebtoken');

// //module administrator
// const Administrator = require('../modules/administrator.model');

//module user
const user = require('../modules/user.model');

// //autherazzation
// const autheratazation = require('./autherazation');

function getToken(data) {
    //console.log('token');
    try{
        const token = jwt.sign(data, process.env.LOGIN_TOKEN, {expiresIn: '60m'});
        // console.log(token);
        return token;
    }
    catch(err){
        console.log(err);
    }
}


function getFreshToken(data) {
    //console.log('token');
    try{
        const token = jwt.sign(data, process.env.LOGIN_FRESH_TOKEN, {expiresIn: '30h'});
        // console.log(token);
        return token;
    }
    catch(err){
        console.log(err);
    }
}

async function authorize(req, res, next) {
    user.findOne({userId: req.body.userId}, async(err, userData)=>{
        if(err)  res.status(500).json({
            'Error': 'DB Server faild'
        });
        else{
            if(userData){
                try{
                    // console.log('err');
                    const passwordValid = await bcryptjs.compare(req.body.password, userData.password);
                    //console.log(passwordValid);
                    if(!passwordValid){
                        // console.log(!passwordValid);
                        res.status(400).json({
                            'Error': 'Email or password wrong'
                        });
                    }
                    else{
                        const payload = {
                            user: {
                              id: userData._id
                            }
                        };
                    
                        const accessToken = getToken(payload);
                        //console.log(accessToken);
                        res.json({ 'token' : accessToken});
                        // next();
                    }
                }catch(err){
                    //console.log('Errrrr');
                    res.status(401).json({
                        'Error': 'Error'
                    });
                }
                

            }else{
                res.status(400).json({
                    'Error': 'Unauthorized'
                });
            }
        }
    });
    
}

// async function adminFreshAuth(req, res, next) {
//     Administrator.findOne({email: req.body.email}, async(err, userData)=>{
//         if(err)  res.status(500).json({
//             'Error': 'DB Server faild'
//         });
//         else{
//             if(userData){
//                 try{
//                     // console.log('err');
//                     const passwordValid = await bcryptjs.compare(req.body.password, userData.password);
//                     //console.log(passwordValid);
//                     if(!passwordValid){
//                         // console.log(!passwordValid);
//                         res.status(400).json({
//                             'Error': 'Email or password wrong'
//                         });
//                     }
//                     else{
//                         const payload = {
//                             user: {
//                               id: userData._id
//                             }
//                         };
                    
//                         const accessToken = getFreshToken(payload);
//                         //console.log(accessToken);
//                         res.json({ 'freshToken' : accessToken});
//                         // next();
//                     }
//                 }catch(err){
//                     //console.log('Errrrr');
//                     res.status(401).json({
//                         'Error': 'Error'
//                     });
//                 }
                

//             }else{
//                 res.status(400).json({
//                     'Error': 'Unauthorized'
//                 });
//             }
//         }
//     });
    
// }

// async function userFreshAuth(req, res, next) {
//     user.findOne({email: req.body.email}, async(err, userData)=>{
//         if(err)  res.status(500).status(500).json({
//             'Error': 'DB Server faild'
//         });
//         else{
//             if(userData){
//                 try{
//                     //console.log('err');
//                     const passwordValid = await bcryptjs.compare(req.body.password, userData.password);
//                     // console.log(passwordValid);
//                     if(!passwordValid){
//                         // console.log(!passwordValid);
//                         res.status(400).json({
//                             'Error': 'Email or password wrong'
//                         });
//                     }
//                     else{
//                         const payload = {
//                             user: {
//                               id: userData._id
//                             }
//                         };

//                         const accessToken = getFreshToken(payload);
//                         // console.log(accessToken);
//                         res.json({ 'freshToken' : accessToken});
//                         // next();
//                     }
//                 }catch(err){
//                     // console.log('Errrrr');
//                     res.status(401).json({
//                         'Error': 'Error'
//                     });
//                 }
                

//             }else{
//                 res.status(400).json({
//                     'Error': 'Unauthorized'
//                 });
//             }
//         }
//     });
// }


// async function userAuth(req, res, next) {
//     user.findOne({email: req.body.email}, async(err, userData)=>{
//         if(err)  res.status(500).status(500).json({
//             'Error': 'DB Server faild'
//         });
//         else{
//             if(userData){
//                 try{
//                     //console.log('err');
//                     const passwordValid = await bcryptjs.compare(req.body.password, userData.password);
//                     // console.log(passwordValid);
//                     if(!passwordValid){
//                         // console.log(!passwordValid);
//                         res.status(400).json({
//                             'Error': 'Email or password wrong'
//                         });
//                     }
//                     else{
//                         const payload = {
//                             user: {
//                               id: userData._id
//                             }
//                         };

//                         const accessToken = getToken(payload);
//                         // console.log(accessToken);
//                         req.user = userData.username;
//                         res.json({ 'token' : accessToken});
//                         // next();
//                     }
//                 }catch(err){
//                     // console.log('Errrrr');
//                     res.status(401).json({
//                         'Error': 'Error'
//                     });
//                 }
                

//             }else{
//                 res.status(400).json({
//                     'Error': 'Unauthorized'
//                 });
//             }
//         }
//     });
// }


module.exports = {
    authorize
}
