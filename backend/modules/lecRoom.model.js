const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lecRoomSchema = new Schema({

    roomName: {
        type: String,
        required: true,
        min: 1,
        max: 20
    },

    controlUnitId:{
        type: String,
        required: true
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

const LecRoom = mongoose.model('LecRoom', lecRoomSchema);

module.exports = LecRoom;