const mongoose = require('mongoose');

const bookSchema =new mongoose.Schema({
    title :{
        type:"string",required:true
    },
    authorID:{
        type:"string"
    },
    categoryID:"string", 
    imgSrc:String,
    rating:{
        total:Number,users:Number
    },
    reviews:[{userName : "String" , review : "String"}],
    description:String
});


const Book = new mongoose.model('Book',bookSchema);
module.exports = Book;