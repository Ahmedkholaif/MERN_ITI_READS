const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');

const multer = require('multer');
const uploading = multer({
    dest:'./public/bookCovers'
  })


  router.post('/',uploading.single("image"),(req,res)=>{
    const title = req.body.title;
    const author = req.body.author;
    const category = req.body.category;
    const imgSrc = req.file.path;

    let authorID;
    let categoryID;
    //query to find the authot and the category
    let findAuthor = Author.findOne(
        // query
        {firstName: author},
        (err, author) => {
            console.log(author);
            if (err) return res.status(200).send(err)
            console.log(author._id);
            authorID = author._id;
       }
    );
    let findCat = Category.findOne(
        // query
        {title: category},
        (err, category) => {
            if (err) return res.status(200).send(err)
            categoryID=category._id;
            return
       }
    );

    //converting queries into promises 
    let findAuthPromise = findAuthor.exec();
    let findCatPromise = findCat.exec();

    const addBook = ()=>{
        const book = new Book({
           title ,
           authorID,
           categoryID,
           imgSrc
       });
       book.save()
       .then ( () =>  {
               res.send("done");
           })
       .catch(e => res.status(404).send(e));
       }

       //use promises to add book after getting the data from the database
     findAuthPromise.then(()=>{
         findCatPromise.then(()=>{
             addBook();
         })
     })
    })

module.exports = router;
