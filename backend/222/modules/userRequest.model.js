const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userRequestSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 1024,
    },

    verified: {
        type: Boolean,
        //required: true,
        default: false
    },

    password: {
        type: String,
        required: true,
        min: 5,
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

const userRequest = mongoose.model('userRequest', userRequestSchema);

module.exports = userRequest;