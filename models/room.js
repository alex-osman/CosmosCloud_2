const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Room Name Required']
    },
    max: {
        type: [Number],
        required: [true, 'Max Required']
    },
    min: {
        type: [Number],
        required: [true, 'Min Required']
    },
    enter: {
        type: [String],
        required: [false]
    },
    enterString: {
        type: [String],
        default: []
    },
    leave: {
        type: [String],
        required: [false]
    },
    leaveString: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Room', roomSchema);