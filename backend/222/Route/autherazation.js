//jwt
const jwt = require('jsonwebtoken');

//auth
const auth = require('./auth');

//module administrator
const Administrator = require('../modules/administrator.model');

//module 
const user = require('../modules/user.model');


function getToken(data) {
    console.log('token');
    try{
        const token = jwt.sign(data, process.env.LOGIN_TOKEN, {expiresIn: '60m'});
        // console.log(token);
        return token;
    }
    catch(err){
        console.log(err);
    }
    
    
}

function authToken(token) {
    jwt.verify(token, process.env.LOGIN_TOKEN, (err, user) => {
        if(err) return false;
        else return user;
    });
    
}

async function authAdmin(req, res, next) {
    try{
        const authHeader = req.headers['auth'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null) res.status('400').send('does not have token');
        jwt.verify(token, process.env.LOGIN_TOKEN, (err, user) => {
            if(err) res.status('400').send('admin does not exist');
            else
            {
                Administrator.findOne({email: user.email}, async(err, data)=>{
                    if(err) res.send('Try again...');
                    else{
                        if(data) next();
                        else{
                            res.status('400').send('not a admin');
                        }
                    }
                });
                // if(!auth.adminAuth(user)) res.status('400').send('not a admin');
                // else{
                //     next();
                // }
            }
        });
    }
    catch(err){
        res.status(500);
    }


    // console.log(user);
    // if(!user) return res.status('400').send('user does not exist');
    // else{

    //     if(!adminAuth(user)) res.status('400').send('not a admin');
    //     else{
    //         next();
    //     }
    // }
    
}

async function authUser(req, res, next) {
    const authHeader = req.headers['auth'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) res.status('400').send('does not have token');
    jwt.verify(token, process.env.LOGIN_TOKEN, (err, user) => {
        if(err) res.status('400').send('user does not exist');
        else
        {
            user.findOne({email: user.email}, async(err, data)=>{
                if(err) res.send('Try again...');
                else{
                    if(data) next();
                    else{
                        res.status('400').send('not a user');
                    }
                }
            });
        }
    });
    
}



module.exports = {
    getToken,authToken,authAdmin,authUser
}