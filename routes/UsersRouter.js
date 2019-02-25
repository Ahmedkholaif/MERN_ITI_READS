const express = require('express');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const uploading = multer({
    dest: './public/profilePics/',
})
const bcrypt = require('bcryptjs');
const { authenticate, auth_Admin } = require('../helpers/Auth');
// uploading.single("image")
router.post('/register', (req, res) => {
    
    console.log(req.body,req.files);
    console.log("reach end point");
    console.log(req.headers);

    // let uploadFile = req.files.file
    // const fileName = req.files.file.name
    // let imgSrc ;
    // uploadFile.mv(
    //     `${__dirname}/public/files/${fileName}`,
    //     function (err) {
    //       if (err) {
    //           console.log(err);
    //         return res.status(500).send(err)
    //       }
    //       imgSrc = `public/${req.files.file.name}`
    //     }
    // )
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    
   
    User.findOne({email})
    .then(user=>{
        if(user) {
            return res.status(400).json({err:"Email already exists "});
        }else {
            const user = new User({
                firstName ,
                lastName,
                email,
                password,
                // imgSrc,

            });
            
            user.save()
            .then ( () =>  {
                return user.getAuthToken();})
                .then(token => {
                    console.log(user);
                    res.header('x-auth',token).send(user);
                })
            .catch(err => res.status(404).send({err}));
        }
    } )
    
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: "Invalid Email Or Password " })
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            return user.getAuthToken()
                                .then(token => {
                                    res.header('x-auth', token).send(user);
                                })
                        } else {
                            return res.status(400).json({ password: "Invalid Email Or Password" });
                        }
                    })
            }
        })

});


//  Private route
//

router.get('/current', authenticate, (req, res) => {
    res.send(req.user)
})

//

router.delete('/current/logout', authenticate, (req, res) => {

    req.user.removeToken(req.token)
        .then(() => res.status(200).send())
        .catch(() => res.status(404).send());
});



module.exports = router;
