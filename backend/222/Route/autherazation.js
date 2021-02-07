//jwt
const jwt = require('jsonwebtoken');

//auth
const auth = require('./auth');

//module administrator
const Administrator = require('../modules/administrator.model');

//module 
const User = require('../modules/user.model');




// function authToken(token) {
//     jwt.verify(token, process.env.LOGIN_TOKEN, (err, user) => {
//         if(err) return false;
//         else return user;
//     });
    
// }

async function authAdminFresh(req, res, next) {
    try{
        const authHeader = req.headers['x-auth-token'];
        const token = authHeader && authHeader.split(' ')[1];   //like <word> + <space> + token
        if(token == null) res.status(401).json({
            'Error': 'does not have token. authorization denied'
        });
        else{
            jwt.verify(token, process.env.LOGIN_FRESH_TOKEN, (err, userByToken) => {
                if(err) res.status(401).json({
                    'Error': 'Token not valid'
                });
                else
                {
                    Administrator.findById( userByToken._id, async(err, data)=>{
                        if(err) res.json({
                            'Error':'Try again...'
                        });
                        else{
                            if(data){
                                req.user = data_id;
                                next();

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
        }
        
    }
    catch(err){
        res.status(500).json({
            'Error': 'Error'
        });
    }
    
}

async function authAdmin(req, res, next) {
    try{
        const authHeader = req.headers['x-auth-token'];
        const token = authHeader && authHeader.split(' ')[1];   //like <word> + <space> + token
        if(token == null) res.status(401).json({
            'Error': 'does not have token. authorization denied'
        });
        else{
            jwt.verify(token, process.env.LOGIN_TOKEN, (err, userByToken) => {
                if(err) res.status(401).json({
                    'Error': 'Token not valid'
                });
                else
                {
                    Administrator.findById( userByToken._id, async(err, data)=>{
                        if(err) res.json({
                            'Error':'Try again...'
                        });
                        else{
                            if(data){
                                req.user = data_id;
                                next();

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
        }
        
    }
    catch(err){
        res.status(500).json({
            'Error': 'Error'
        });
    }
    
}

async function authUser(req, res, next) {
    try{
        const authHeader = req.headers['auth'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null) res.status(401).json({
            'Error': 'does not have token. authorization denied'
        });
        else{

            jwt.verify(token, process.env.LOGIN_TOKEN, (err, userByToken) => {
                if(err) res.status(401).json({
                    'Error': 'Token not valid'
                });
                else
                {
                    User.findById(userByToken, async(err, data)=>{
                        if(err) res.json({
                            'Error':'Try again...'
                        });
                        else{
                            if(data){
                                req.user = data_id;
                                next();

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

        }
        

    }catch(err){
        res.status(500).json({
            'Error': 'Error'
        });
    }
    
}

async function authUserFresh(req, res, next) {
    try{
        const authHeader = req.headers['x-auth-token'];
        const token = authHeader && authHeader.split(' ')[1];   //like <word> + <space> + token
        if(token == null) res.status(401).json({
            'Error': 'does not have token. authorization denied'
        });
        else{
            jwt.verify(token, process.env.LOGIN_FRESH_TOKEN, (err, userByToken) => {
                if(err) res.status(401).json({
                    'Error': 'Token not valid'
                });
                else
                {
                    User.findById( userByToken._id, async(err, data)=>{
                        if(err) res.json({
                            'Error':'Try again...'
                        });
                        else{
                            if(data){
                                req.user = data_id;
                                next();

                            }
                            else{
                                res.status(400).json({
                                    'Error':'not a User'
                                });
                            }
                        }
                    });
                }
            });
        }
        
    }
    catch(err){
        res.status(500).json({
            'Error': 'Error'
        });
    }
    
}



module.exports = {
    authAdmin,authUser,authAdminFresh,authUserFresh
}