const http = require('http');
const fs = require('fs');
const express = require('express');
const cron = require('node-cron');

//configer env veriable
const dotenv = require('dotenv').config();
if (dotenv.error) {
    throw dotenv.error;
}

//data base
const mongoose = require('mongoose');
const db = mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true ,useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the db...');

    }).catch((error) => {
        console.log('Failed to connect db...', error);
    });


//init express
const app = express();

//port
const PORT = process.env.PORT || 3000;

//server initiating
const ser = http.createServer(app).listen(PORT, 'localhost',function(){
    console.log(`Server is listening on port {$PORT}`);

});


//need to impl
cron.schedule('* * /2 * *', ()=>{
    //run background task

});

//middleware
app.use(express.json());

//user signup
const signup = require('./Route/signup');
app.use('/signup', signup);

//route middleware
const login = require('./Route/login');
app.use('/login', login);


//route middleware admin
const admin = require('./Route/admin');
app.use('/admin', admin);

//route middleware admin
const user = require('./Route/user');
app.use('/user', user);

// 404
app.use((req, res)=>{
    res.status(404).send('404');
});


// app.get('/', function(req, res)
// {
//     res.sendFile('./FrontEnd/index.html', { root: __dirname});
// });