const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lecRoomSchema = new Schema({

    // roomId: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },

    controlUnitId:{
        type: String,
        required: true
    },

    roomName: {
        type: String,
        required: true,
        min: 1,
        max: 20
    }

    // isReserved: {
    //     type: Boolean,
    //     required: true
    // },

}, {
    timestamps: true
});

const LecRoom = mongoose.model('LecRoom', lecRoomSchema);

module.exports = LecRoom;