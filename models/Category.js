const mongoose = require('mongoose');

const categorySchema =new mongoose.Schema({
    title :{
        type:"string",required:true
    }
});


const Category = new mongoose.model('Category',categorySchema);

// cat1 = new Category({
//     title:"Fiction"
// });
// console.log(cat1);
// cat1.save(err=>{
//     if(err) console.log(err);
// });
module.exports = Category;