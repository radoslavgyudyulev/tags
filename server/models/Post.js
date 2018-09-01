const mongoose = require('mongoose');


function getDate(date) {
    console.log(date)
}

const PostSchema = new mongoose.Schema({
    tag : { type : mongoose.SchemaTypes.String, required: true },
    post : { type : mongoose.SchemaTypes.String, required : true },
    color : { type : mongoose.SchemaTypes.String, required : true },
    date : { type : Date, default : new Date()}
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;