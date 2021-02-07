const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userNeedSignupSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 1024,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 60,
    },

    // fullName: {
    //     type: String,
    //     required: true
    // }
}, {
    timestamps: true
});

const userNeedSignup = mongoose.model('userNeedSignup', userNeedSignupSchema);

module.exports = userNeedSignup;