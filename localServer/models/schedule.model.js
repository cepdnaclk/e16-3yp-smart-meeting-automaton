// const { string } = require('@hapi/joi');
const { date } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schedule = new Schema({

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

    startTime: {
        type: Date,
        required: true,
    },

    endTime: {
        type: Date,
        required: true
    },

    userId: {
        type: String,
        required: true,
        min: 1,
        max: 1024,
    },

}, {
    timestamps: true
});

const scheduleSchema = mongoose.model('scheduleSchema', schedule);

module.exports = scheduleSchema;