// const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({

    roomName: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },

    subject: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },

    time: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const schedule = mongoose.model('schedule', scheduleSchema);

module.exports = schedule;