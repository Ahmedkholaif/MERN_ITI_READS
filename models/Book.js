const mongoose = require('mongoose');

const bookSchema =new mongoose.Schema({
    title :{
        type:"string",required:true
    },
    authorID:{
        type:mongoose.Types.ObjectId,ref:'Author',required:true
    },
    categoryID:{type:mongoose.Types.ObjectId,ref:'Category'},
    imgSrc:String,
    rating:{
        total:Number,users:Number
    },
    reviews:[{}],
    description:String
});


const Book = new mongoose.model('Book',bookSchema);
module.exports = Book;