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

    controlUnitId:{
        type: String,
        required: true
    },

    isWorking: {
        type: Boolean,
        required: true
    }

}, {
    timestamps: true
});

const Ac = mongoose.model('Ac', acSchema);

module.exports = Ac;