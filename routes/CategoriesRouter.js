const express = require('express');
const Category = require('../models/Category');

const router = express.Router();



//Routes for Category
// Get all category and display them

router.get("/", (req, res) => {
    Category.find((err, data) => {
        res.json(data);
    });
});
//Add a new category

router.post("/", (req, res) => {

    const title = req.body.title;

    const category = new Category({
        title,
    });

    category.save()
    .then(()=>{
        res.status(200).send(category);
    })
    .catch((e)=>{
        res.status(404).send(e);
        console.log(e);
    });
});

//Edit a category

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const title = req.body.title;

    Category.updateOne({
        _id:id
    },
    { $set:
        {
        title: title,
        }
    })
    .then(()=>{
        res.status(200).send({msg:"updated"});
     })
    .catch((e)=>{
         res.status(404).send(e);
     });
});
//Delete a category
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Category.deleteOne({
        _id: id
    })
    .then(()=>{
        res.status(200).send({msg:"deleted"});
    })
    .catch((e)=>{
        res.status(404).send(e);
    })
});
//End of Routes for Category






module.exports = router;
