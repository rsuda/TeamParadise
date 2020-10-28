const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

const Posts = mongoose.model('Posts', PostSchema);

module.exports = { Posts }