var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    points : {
        type: Number,
        default: 0
    },
    tasksCompleted : {
        type: Number,
        default: 0
    },
    achievements: [ ]
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);


// username
// password
// points
// taskscompleted
