const express = require('express');
const app = express();
const CookieParser = require('cookie-parser');
const mongoose = require('mongoose');

app.use(CookieParser());
app.use(express.json());

const mongodbURI = require('./config/keys').mongoURI;

mongoose.connect(mongodbURI, {useNewUrlParser : true, useUnifiedTopology: true }, () => {
    console.log('Successfully connected to database');
});


// const User = require('./models/Users');

// const userInput = {
//     username: "chamathamar",
//     password: "1234567",
//     role: "admin"
// }

// const user = new User(userInput);
// user.save((err, document)=>{
//     if(err)
//         console.log(err);
//     console.log(document);
// });

const userRouter = require('./routes/User');
app.use('/user', userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});