// const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userTimeTableSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 1024,
    },

    timeTable: {
        type: Map,
        of: String
    }

}, {
    timestamps: true
});

const userTimeTable = mongoose.model('userTimeTable', userTimeTableSchema);

module.exports = userTimeTable;