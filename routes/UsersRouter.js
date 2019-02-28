const express = require("express");
const User = require("../models/User");

const userHomeRouter = require('./userHomeRouter');
const multer = require('multer');

const bcrypt = require('bcryptjs');
const router = express.Router();
const { authenticate, auth_Admin } = require('../helpers/Auth');
router.post('/register', (req, res) => {
    
    const body =JSON.parse(req.body.body);
    console.log(req.body);
    console.log(body);
    let img ;
    let uploadFile = req.files.file ;
    const fileName = `${new Date().toISOString()}${Math.random()}${req.files.file.name}` ;
    
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const password = body.password;
   
    User.findOne({email})
    .then(user=>{
        if(user) {
            return res.status(400).json({err:"Email already exists "});
        }else {
            uploadFile.mv(
                `${__dirname}/../public/${fileName}`,
                (err)=> {
                    if(err) {return res.status(500).send(err)}
        
                    img =  `../../../${fileName}`;
                   
                    const user = new User({
                        firstName ,
                        lastName,
                        email,
                        password,
                        img
                        })
                    user.save()
                    .then ( () =>  {
                        return user.getAuthToken();})
                        .then(token => {
                            console.log(user);
                            res.header('x-auth',token).send(user);
                        })
                    .catch(err => res.status(404).send({err,err:"save error"}));
                    });
        }
    } )
});
router.post("/register", (req, res) => {
  const body = JSON.parse(req.body.body);
  console.log(req.body);
  console.log(body);
  let imgSrc;
  let uploadFile = req.files.file;
  const fileName = `${new Date().toISOString()}${Math.random()}${
    req.files.file.name
  }`;

  const firstName = body.firstName;
  const lastName = body.lastName;
  const email = body.email;
  const password = body.password;

  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ err: "Email already exists " });
    } else {
      uploadFile.mv(`${__dirname}/../public/${fileName}`, err => {
        if (err) {
          return res.status(500).send(err);
        }

        imgSrc = `../../../${fileName}`;
        console.log(firstName, lastName, email, password, imgSrc);
        const user = new User({
          firstName,
          lastName,
          email,
          password,
          imgSrc
        });
        user
          .save()
          .then(() => {
            return user.getAuthToken();
          })
          .then(token => {
            console.log(user);
            res.header("x-auth", token).send(user);
          })
          .catch(err => res.status(404).send({ err, err: "save error" }));
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ err: "Invalid Email Or Password " });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          return user.getAuthToken().then(token => {
            res.header("x-auth", token).send(user);
          });
        } else {
          return res.status(400).json({ err: "Invalid Email Or Password" });
        }
      });
    }
  });
});

//  Private route
//

router.use("/current", authenticate, (req, res, next) => {
  next();
});


router.use("/current", userHomeRouter);
//
router.delete("/current/signout", authenticate, (req, res) => {
  req.user
    .removeToken(req.token)
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send());
});

module.exports = router;
