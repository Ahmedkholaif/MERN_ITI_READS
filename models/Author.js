const mongoose = require('mongoose');

const authorSchema =new mongoose.Schema({
    name:{
        type:"string",required:true
    },
    imgSrc:String,
    dateOfBirth:Date
});

const Author = new mongoose.model('Author',authorSchema);
module.exports = Author;