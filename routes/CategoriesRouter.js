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
        const category1 = new Category({
            title: title,
        });
        console.log(category1);
        user1.save((err) => {
            if (err) console.log(err);
        })
        res.json(category1);
    });
    //Edit a category
    router.put("/:id", (req, res) => {
        const id = req.params.id;
        const title = req.body.title;
    
        Category.updateOne({
            _id: `${id}`
        }, {
            title: title,
        }, (err, res) => {
            if (err) console.log(err);
            console.log(res);
        });
        res.send("Category Updated");
    });
    //Delete a category
    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        Category.deleteOne({
            _id: `${id}`
        }, (err) => {
            if (err) console.log(err);
            res.send("Category Deleted");
        })
    });
    //End of Routes for Category






module.exports=router;