const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploading = multer({
    dest:'./public/authorsPics',
  })
//Start of Routes for Author
// Get all Author and display them
router.get("/", (req, res) => {
        Author.find((err, data) => {
            res.json(data);
        });
    });

    //Add a new Author
    router.post("/",uploading.single("image"), (req, res) => {
        const name = req.body.name;
        const imgSrc = req.file.path;
        const dateOfBirth = req.body.dateOfBirth;
        const author = new Author({
            name: name,
            imgSrc: imgSrc,
            dateOfBirth: dateOfBirth
        });
        author.save((err) => {
            if (err) console.log(err);
        })
        res.json(author);
    });
    //Edit an Author 
    //////////////Name//////////////
    router.put("/:name",uploading.single("image"), (req, res) => {
        const oldName = req.params.name;
        const name = req.body.name;
        const imgSrc = req.file.path;
        const dateOfBirth = req.body.dateOfBirth;
        Author.updateOne({
            _id: `${id}`
        }, {
            name: name,
            imgSrc: imgSrc,
            dateOfBirth: dateOfBirth
        }, (err, res) => {
            if (err) console.log(err);
            console.log(res);
        });
        res.send("Author Updated");
    });
    //Delete an Author
    router.delete("/:name", (req, res) => {
        const name = req.params.name;
        Author.deleteOne({
            name: `${name}`
        }, (err) => {
            if (err) console.log(err);
            res.send("Author Deleted");
        })
    });
    //End of Routes for Author
module.exports=router;