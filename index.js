const express = require ('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001 ;

const app = express();




app.listen(PORT,()=>{
    console.log(`Server Started at port ${PORT}`);
})
// .then(()=>{
//     console.log(`Server Started at port ${PORT}`);
// })
// .catch ((err)=> console.log(err));