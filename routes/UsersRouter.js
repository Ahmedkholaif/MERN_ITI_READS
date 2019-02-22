const express = require('express');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const uploading = multer({
    dest: './public/profilePics/',
})
const bcrypt = require('bcryptjs');
const { authenticate, auth_Admin } = require('../helpers/Auth');

router.post('/register', uploading.single("image"), (req, res) => {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const imgSrc = req.file.path;

    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: "Email already exists " });
            } else {
                const firstName = req.body.fname;
                const lastName = req.body.lname;
                const password = req.body.password;
                const imgSrc = req.body.img;// == image source

                const user = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    imgSrc,
                    isAdmin: req.body.isAdmin
                });

                user.save()
                    .then(() => {
                        return user.getAuthToken();
                    })
                    .then(token => {
                        res.header('x-auth', token).send(user);
                    })
                    .catch(e => res.status(404).send(e));
            }
        })

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