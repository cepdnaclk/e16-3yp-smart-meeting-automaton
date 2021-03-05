// const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectorSchema = new Schema({

    // roomName: {
    //     type: String,
    //     required: true,
    //     min: 1,
    //     max: 20
    // },

    controlUnitId:{
        type: String,
        required: true,
        min: 1,
        max: 1024
    },

    isWorking: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

const projector = mongoose.model('projector', projectorSchema);

module.exports = projector;