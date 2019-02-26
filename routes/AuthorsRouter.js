const express = require('express');
const multer = require('multer');
const router = express.Router();
const Author = require('../models/Author');
const Cat = require('../models/Category');
const Book = require('../models/Book');
const uploading = multer({
    dest:'./public/authorsPics',
  })
//Start of Routes for Author

// Get all Author and display them
router.get('/', (req, res) => {

  Author.find({})
  .then((authors)=>{
    Cat.find({}).then((cats )=>{
      res.status(200).send({authors,cats});
    })
  })
  .catch((e)=>{
      res.status(404).send(e);
  })
});


// Add a new Author
// @ admin Auth
router.post('/', (req, res) => {
  const fullName = req.body.fullName;
//   const lastName = req.body.lastName;
  const imgSrc = req.body.imgSrc;
  const dateOfBirth = req.body.dateOfBirth;

  const author = new Author({
    fullName,
    // lastName,
    imgSrc,
    dateOfBirth
  });

  console.log(author)

  author.save()
  .then(()=>{
      res.status(200).send(author);
  }).catch((e)=>{
      console.log(e);
      res.status(404).send({
          msg:'error'
      });
  })
});


// Edit an Author
//@ admin auth
router.put('/:name', (req, res) => {
  const oldname = req.params.name;
  const fullName = req.body.fullName;
//   const lastName = req.body.lastName;
  const imgSrc = req.body.imgSrc;
  const dateOfBirth = req.body.dateOfBirth;

  Author.updateOne(
    {
      fullName: oldname
    },
    { $set: {
        fullName: fullName,
        // lastName: lastName,
        imgSrc: imgSrc,
        dateOfBirth: dateOfBirth,
        }
    })
    .then(()=>{
        res.status(200).send({masg:"succes"});
    }) 
    .catch((e)=>{
        res.status(404).send(e);
    })
});
// Delete an Author
router.delete("/:author" , (req,res)=>{
  let author = req.params.author;
  Author.remove({fullName:author},(err,data)=>{
      Book.remove({authorID : author},(err,data)=>{
          res.status(200).send()
      })
  })
})

// End of Routes for Author
module.exports = router
