var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank!'
    },
    completionDate : String,
    creationDate : String,
    importance: Number,
    completed: {
        type: Boolean,
        default: false
    },
    createdUserID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdUsername : String
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
