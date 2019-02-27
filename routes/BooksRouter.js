const express = require("express");
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');
const multer = require('multer');


const {auth_Admin} = require('../helpers/Auth');
router.post('/', auth_Admin, (req, res) => {
    
    const body =JSON.parse(req.body.body);
    
    let uploadFile = req.files.file ;

    const fileName = `${new Date().toISOString()}${Math.random()}${req.files.file.name}` ;
    const bookName = body.bookName;
    const author = body.author;
    
    const category = body.category;
    let img;

    let authorID;
    let categoryID;
    //query to find the authot and the category

    Book.find({bookName})
    .then(book =>{
        if(book) {
            return res.status(400).send({err:"already exists"});
        }else {

        let findAuthor =
        Author.findOne(
            // query
            {
              fullName: author
            },(err, author) => {
                console.log(author);
                if (err) return res.status(200).send(err)
                console.log(author._id);
                authorID = author._id;
            }
        );

    let findCat = Category.findOne(
        // query
        {
            catName: category
        },(err, category) => {
            if (err) return res.status(200).send(err)
            categoryID = category._id;
        }
    );
    //converting queries into promises 
    let findAuthPromise = findAuthor.exec();
    let findCatPromise = findCat.exec();

    const addBook = () => {

    uploadFile.mv(
    `${__dirname}/../public/${fileName}`,(err)=> {
        
      if(err) {return res.status(500).send(err)}
      img =  `../../../${fileName}`;
        const book = new Book({
            title,
            author,
            category,
            img,
        });
        book.save()
            .then(() => {
                res.send("done");
            })
            .catch(e => res.status(404).send(e));
    })
  }

    //use promises to add book after getting the data from the database
  findAuthPromise
  .then(() => {
      findCatPromise
      .then(() => {
          addBook();
      })
  })
  .catch(err => res.status(404).send({err}))
  }
  })
    .catch(err=>res.status(404).send(err))

  })  ;

//Routes for Book
// Get all Books and display them
router.get("/", auth_Admin,(req, res) => {
    Book.find((err, data) => {
        res.json(data);
    });
});

//Edit a Book
router.put("/:title", auth_Admin, (req, res) => {

    const body =JSON.parse(req.body.body);
    
    let uploadFile = req.files.file ;

    const fileName = `${new Date().toISOString()}${Math.random()}${req.files.file.name}` ;

    const oldTitle = req.params.title;
    const bookName = body.bookName;
    const author = body.author;
    const category = body.category;
    let img;
    uploadFile.mv(
        `${__dirname}/../public/${fileName}`,(err)=> {
        
        if(err) {return res.status(500).send(err)}
        img =  `../../../${fileName}`;
        Book.updateOne({
            bookName: `${oldTitle}`
        }, {
                bookName,
                author,
                category,
                img
            }, (err, res) => {
                if (err) console.log(err);
                console.log(res);
            })
            .then(res.status(200).send("Book Updated"))
            .catch(err => res.status(404).send({err}))
        })
});
//Delete a Book
router.delete("/:title",auth_Admin, (req, res) => {
    Book.deleteOne({
        bookName: `${title}`
    }, (err) => {
        if (err) console.log(err);
        res.send("Book Deleted");
    })
});
//End of Routes for Books

module.exports = router;
