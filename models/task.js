const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
})

module.exports = Task