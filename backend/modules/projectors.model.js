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
        required: true
    },

    isWorking: {
        type: Boolean,
        required: true,
        default: true
    }

}, {
    timestamps: true
});

const Projector = mongoose.model('Projector', projectorSchema);

module.exports = Projector;