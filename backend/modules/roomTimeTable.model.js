// const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomTimeTableSchema = new Schema({

    roomName: {
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

const roomTimeTableSchema = mongoose.model('roomTimeTableSchema', roomTimeTableSchemaSchema);

module.exports = roomTimeTableSchema;