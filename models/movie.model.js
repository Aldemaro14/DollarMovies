let mongoose = require('mongoose');

//movie schema
let movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: false
    }
});

let Movie = module.exports = mongoose.model('Movie', movieSchema);