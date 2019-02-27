const mongoose = require('mongoose');

const authorSchema =new mongoose.Schema({
    fullName:{
        type:"string",required:true,unique:true
    },
    img:String,
    dateOfBirth:String
});

const Author = new mongoose.model('Author',authorSchema);
module.exports = Author;