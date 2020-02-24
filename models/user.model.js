let mongoose = require('mongoose');

//movie schema
let userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: Boolean
});

let User = module.exports = mongoose.model('User', userSchema);

