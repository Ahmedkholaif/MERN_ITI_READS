const express = require('express');

const router = express.Router();

//Start of Routes for Author
// Get all Author and display them
router.get("/", (req, res) => {
        Author.find((err, data) => {
            res.json(data);
        });
    });
    //Add a new Author
    router.post("/", (req, res) => {
    
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const imgSrc = req.body.imgSrc;
        const dateOfBirth = req.body.dateOfBirth;
        const author1 = new Category({
            firstName: firstName,
            lastName: lastName,
            imgSrc: imgSrc,
            dateOfBirth: dateOfBirth
        });
        console.log(author1);
        author1.save((err) => {
            if (err) console.log(err);
        })
        res.json(author1);
    });
    //Edit an Author 
    router.put("/:id", (req, res) => {
        const id = req.params.id;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const imgSrc = req.body.imgSrc;
        const dateOfBirth = req.body.dateOfBirth;
    
        Author.updateOne({
            _id: `${id}`
        }, {
            firstName: firstName,
            lastName: lastName,
            imgSrc: imgSrc,
            dateOfBirth: dateOfBirth
        }, (err, res) => {
            if (err) console.log(err);
            console.log(res);
        });
        res.send("Author Updated");
    });
    //Delete an Author
    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        Author.deleteOne({
            _id: `${id}`
        }, (err) => {
            if (err) console.log(err);
            res.send("Author Deleted");
        })
    });
    //End of Routes for Author
module.exports=router;