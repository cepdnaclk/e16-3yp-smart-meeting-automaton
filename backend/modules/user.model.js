const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    userId: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 1024
    },

    userName: {
        type: String,
        required: true,
        min: 1,
        max: 1024,
    },

    date: {
        type: Date,
        default: Date.now
    },

    phone: {
        type: String,
        unique: true,
        required: true
    },

    role: {
        type: Number,
        default: 0,
    },

    // verified: {
    //     type: Boolean,
    //     //required: true,
    //     default: false
    // },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 60,
    },

}, {
    timestamps: true
});

const user = mongoose.model('user', userSchema);

module.exports = user;