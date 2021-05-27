// const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const acSchema = new Schema({

    // roomName: {
    //     type: String,
    //     required: true,
    //     min: 1,
    //     max: 20
    // },
    compId: {
        type: String,
        required: true,
        unique: true
    },

    roomName:{
        type: String,
        required: true,
        min: 1,
        max: 1024
    },

    brand: {
        type: String,
        min: 1,
        max: 1024,
        required: true
    },

    model: {
        type: String,
        min: 1,
        max: 1024,
        required: true
    },

    isWorking: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

const ac = mongoose.model('ac', acSchema);

module.exports = ac;