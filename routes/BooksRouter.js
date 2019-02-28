const express = require("express");
const router = express.Router();
const Book = require('../models/Book');


const {auth_Admin} = require('../helpers/Auth');
router.post('/', auth_Admin, (req, res) => {
    
    const body =JSON.parse(req.body.body);
    
    let uploadFile = req.files.file ;
    console.log(body,"reached");
    
    const fileName = `${new Date().toISOString()}${Math.random()}${req.files.file.name}` ;
    const bookName = body.bookName;
    const author = body.author;
    const category = body.category;
    const description = body.description;
    let img;

    Book.findOne({bookName})
    .then(book =>{
        if(book) {
            return res.status(400).send({err:"already exists"});
        }else {
            uploadFile.mv(
                `${__dirname}/../public/${fileName}`,(err)=> {
                    
                  if(err) {return res.status(500).send(err)}
                  img =  `../../../${fileName}`;
                    const book = new Book({
                        bookName,
                        author,
                        category,
                        img,
                        description,
                    });
                    book.save()
                    .then(()=>{
                        console.log(book)
                        res.status(200).send({book});
                    })
                    .catch((e)=>{
                        console.log(e);
                        res.status(404).send({  msg:'error' });
                    })
                })
            }

  })
})

//Routes for Book
// Get all Books and display them
router.get("/", auth_Admin,(req, res) => {
    Book.find((err, books) => {
        res.status(200).json({books});
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
router.delete("/:bookID",auth_Admin, (req, res) => {
    const bookID = req.params.bookID;

    Book.deleteOne({
        _id: bookID
    }, (err) => {
        if (err) res.status(404).send({msg:"error delete obj"});
        res.status(200).send({msg:"Book Deleted"});
    })
});
//End of Routes for Books

module.exports = router;
