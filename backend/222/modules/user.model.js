const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coordinatorSchema = new Schema({

    username: {
        type: String,
        required: true,
        min: 1,
        max: 1024,
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },

    // userId: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },

    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 60,
    },

    // fullName: {
    //     type: String,
    //     required: true,
    // }

}, {
    timestamps: true
});

const Coordinator = mongoose.model('user', coordinatorSchema);

module.exports = Coordinator;