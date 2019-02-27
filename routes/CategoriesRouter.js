const express = require('express');
const Category = require('../models/Category');
const {auth_Admin} = require('../helpers/Auth');
const router = express.Router();

//Routes for Category
// Get all category and display them

router.get("/", auth_Admin,(req, res) => {
    Category.find((err, data) => {
        res.json(data);
    });
});
//Add a new category

router.post("/",auth_Admin, (req, res) => {

    const catName = req.body.title;

    const category = new Category({
        catName,
    });

  category
    .save()
    .then(() => {
      res.status(200).send(category);
    })
    .catch(e => {
      res.status(404).send(e);
      console.log(e);
    });
});

//Edit a category

router.put("/:title",auth_Admin, (req, res) => {
    const oldtitle = req.params.title;
    const catName = req.body.title;

    Category.updateOne({
        catName:oldtitle
    },
    { $set:
        {
        catName,
        }
    })
    .catch(e => {
      res.status(404).send(e);
    });
});
//Delete a category
router.delete("/:title",auth_Admin, (req, res) => {
    const catName = req.params.title;
    Category.deleteOne({
        catName
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
