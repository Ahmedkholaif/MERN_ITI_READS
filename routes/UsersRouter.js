const express = require('express');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const uploading = multer({
    dest:'./public/profilePics/',
  })


router.post('/',uploading.single("image"),(req,res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const imgSrc = req.file.path;
    
    const user = new User({
        firstName ,
        lastName,
        email,
        password,
        imgSrc,
    });
    
    user.save()
    .then ( () =>  {
        return user.getAuthToken();})
        .then(token => {
            res.header('x-auth',token).send();
        })
    .catch(e => res.status(404).send(e));
});

router.post('/signin',(req,res)=>{
    

});

router.get('/id',(req,res)=>{


})





module.exports=router;