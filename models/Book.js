const mongoose = require('mongoose');

const bookSchema =new mongoose.Schema({
    bookName :{
<<<<<<< HEAD
        type:"string",required:true
=======
        type:"string",required:true,unique:true 
>>>>>>> fe1d473ff43ce589a0af08b78d8426e041e3d0d6
    },
    author:{
        type:"string"
    },
    category:"string", 
    img:String,
    avgRate:{
        total:Number,users:Number
    },
    reviews:[{userName : "String" , review : "String"}],
    description:String
});


const Book = new mongoose.model('Book',bookSchema);
module.exports = Book;