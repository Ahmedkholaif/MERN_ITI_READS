const mongoose = require('mongoose');

const bookSchema =new mongoose.Schema({
    bookName :{
        type:"string",required:true,unique:true 
    },
    author:{
        type:"string"
    },
    category:String, 
    img:String,
    avgRate:{
        total:Number,users:Number
    },
    reviews:[{userName : "String" , review : "String"}],
    description:String
});


const Book = new mongoose.model('Book',bookSchema);
module.exports = Book;