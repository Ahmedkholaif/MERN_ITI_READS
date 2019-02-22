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
            title: title,
        });
        console.log(category);
        category.save((err) => {
            if (err) console.log(err);
        })
        res.json(category);
    });
    //Edit a category
    router.put("/:title", (req, res) => {
        const oldTitle = req.params.title;
        const title = req.body.title;
        Category.updateOne({
            title: `${oldTitle}`
        }, {
            title: title,
        }, (err, res) => {
            if (err) console.log(err);
            console.log(res);
        });
        res.send("Category Updated");
    });
    //Delete a category
    router.delete("/:title", (req, res) => {
        const title = req.params.title;
        Category.deleteOne({
            title: `${title}`
        }, (err) => {
            if (err) console.log(err);
            res.send("Category Deleted");
        })
    });
    //End of Routes for Category






module.exports=router;