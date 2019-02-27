const express = require("express");
const Category = require("../models/Category");
const Book = require("../models/Book");

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
    title
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

router.put("/:title", (req, res) => {
  const oldtitle = req.params.title;
  const title = req.body.title;

  Category.updateOne(
    {
      title: oldtitle
    },
    {
      $set: {
        title: title
      }
    }
  )
    .then(() => {
      res.status(200).send({ msg: "updated" });
    })
    .catch(e => {
      res.status(404).send(e);
    });
});
//Delete a category
router.delete("/:category", (req, res) => {
  let catName = req.params.category;
  Category.remove({ title: catName }, (err, data) => {
    Book.remove({ categoryID: catName }, (err, data) => {
      res.status(200).send();
    });
  });
});
//End of Routes for Category

module.exports = router;
