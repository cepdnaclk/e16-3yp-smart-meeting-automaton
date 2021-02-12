const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const administratorSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 1024,
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

}, {
    timestamps: true
});

const Administrator = mongoose.model('Administrator', administratorSchema);

module.exports = Administrator;