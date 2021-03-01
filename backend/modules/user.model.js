const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coordinatorSchema = new Schema({

    username: {
        type: String,
        required: true,
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

const Coordinator = mongoose.model('user', coordinatorSchema);

module.exports = Coordinator;