const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lecRoomSchema = new Schema({

    roomName: {
        type: String,
        required: true,
        min: 1,
        max: 100,
        unique: true
    },

    controlUnitId:{
        type: String,
        required: true,
        min: 1,
        max: 1024
    },

    acId: {
        type: [String],
        default: undefined
    },

    projectorId: {
        type: [String],
        default: undefined
    },

}, {
    timestamps: true
});

const lecRoom = mongoose.model('lecRoom', lecRoomSchema);

module.exports = lecRoom;