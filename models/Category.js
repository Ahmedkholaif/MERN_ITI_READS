const mongoose = require('mongoose');

const categorySchema =new mongoose.Schema({
    catName :{
        type:"string",required:true,unique:true
    },
});


const Category = new mongoose.model('Category',categorySchema);

module.exports = Category;