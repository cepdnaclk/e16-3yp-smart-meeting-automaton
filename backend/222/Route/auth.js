//bcryptjs
const bcryptjs = require('bcryptjs');
const { json } = require('express');

//module administrator
const Administrator = require('../modules/administrator.model');

//module user
const user = require('../modules/user.model');

//autherazzation
const autheratazation = require('./autherazation');

async function adminAuth(req, res, next) {
    Administrator.findOne({email: req.body.email}, async(err, data)=>{
        if(err)  res.status('400').send('Failed...Try again');
        else{
            if(data){
                try{
                    console.log('err');
                    const passwordValid = await bcryptjs.compare(req.body.password, data.password);
                    console.log(passwordValid);
                    if(!passwordValid){
                        // console.log(!passwordValid);
                        res.status(401).send('Email or password wrong...');
                    }
                    else{
                        const accessToken = autheratazation.getToken(req.body);
                        console.log(accessToken);
                        res.send({ accessToken : accessToken});
                        next();
                    }
                }catch(err){
                    console.log('Errrrr');
                    res.status(401).send(err);
                }
                

            }else{
                res.status(401).send('Email or password wrong...');
            }
        }
    });
    // if(!userdata) return false;
    
    // const passwordValid = await bcryptjs.compare(data.password, userdata.password);
    // if(!passwordValid) return false;

    // return true;
    
}


async function userAuth(req, res, next) {
    user.findOne({email: req.body.email}, async(err, data)=>{
        if(err)  res.status('400').send('Failed...Try again');
        else{
            if(data){
                try{
                    console.log('err');
                    const passwordValid = await bcryptjs.compare(req.body.password, data.password);
                    console.log(passwordValid);
                    if(!passwordValid){
                        // console.log(!passwordValid);
                        res.status(401).send('Email or password wrong...');
                    }
                    else{
                        const accessToken = autheratazation.getToken(req.body);
                        console.log(accessToken);
                        res.send({ accessToken : accessToken});
                        next();
                    }
                }catch(err){
                    console.log('Errrrr');
                    res.status(401).send(err);
                }
                

            }else{
                res.status(401).send('Email or password wrong...');
            }
        }
    });
    // if(!userdata) return false;
    
    // const passwordValid = await bcryptjs.compare(data.password, userdata.password);
    // if(!passwordValid) return false;

    // return true;
    
}

// async function userAuth(data) {
//     const userdata = await user.findOne({email: data.email});
//     if(!userdata) return false;
    
//     const passwordValid = await bcryptjs.compare(data.password, userdata.password);
//     if(!passwordValid) return false;

//     return true;
    
// }





module.exports = {
    adminAuth,
    userAuth
}
