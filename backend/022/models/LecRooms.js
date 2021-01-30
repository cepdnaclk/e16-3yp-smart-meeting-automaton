const mongoose = require('mongoose');

const LecRoomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
});


module.exports = mongoose.model('LecRoom', LecRoomSchema);