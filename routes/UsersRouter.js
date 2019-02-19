const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/',(req,res)=>{
    console.log("reached");

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const imgSrc = req.body.img ;// == image source 
    
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