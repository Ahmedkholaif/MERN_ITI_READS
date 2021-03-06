const express = require('express');
const bcrypt = require('bcryptjs');
const Author = require('../models/Author');
const Book = require('../models/Book');
const Category = require('../models/Category');
const categoryRouter = require('./CategoriesRouter');
const bookRouter = require('./BooksRouter');
const authorRouter = require('./AuthorsRouter');
const User = require('../models/User');
const {auth_Admin} = require('../helpers/Auth');
const router = express.Router();

//admin login request
router.post('/',(req,res)=>{
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ err: "Invalid Email Or Password " })
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            return user.getAuthToken()
                                .then(token => {
                                    res.header('x-auth', token).send(user);
                                })
                        } else {
                            return res.status(400).json({ err: "Invalid Email Or Password" });
                        }
                    })
            }
        })

});

router.delete("/signout", auth_Admin, (req, res) => {
    req.user
      .removeToken(req.token)
      .then(() => res.status(200).send())
      .catch(() => res.status(404).send());
  });
//admin private request
router.use('/categories',categoryRouter);
router.use('/books',bookRouter);
router.use('/authors',authorRouter);

module.exports = router;
