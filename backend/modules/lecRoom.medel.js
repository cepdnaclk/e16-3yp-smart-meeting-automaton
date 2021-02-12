const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lecRoomSchema = new Schema({

    roomId: {
        type: String,
        required: true,
        unique: true,
    },

    controlUnitId:{
        type: String,
        required: true
    },

    meetingOwnerId: {
        type: String
    },

    isReserved: {
        type: Boolean,
        required: true
    },

}, {
    timestamps: true
});

const LecRoom = mongoose.model('LecRoom', lecRoomSchema);

module.exports = LecRoom;