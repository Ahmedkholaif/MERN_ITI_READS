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
// /api/admin/categories
router.post("/",auth_Admin, (req, res) => {

    console.log(req.body);
    const catName = req.body.categoryName;

    Category.findOne({catName})
    .then(cat =>{
        if(cat) {
            res.status(404).send({err:'Already Exists '});
        }else{
            const category = new Category({
                catName,
            });
            console.log(catName);
          category
            .save()
            .then(() => {
              res.status(200).send(category);
            })
            .catch(e => {
                res.status(404).send(e);
                console.log(e);
            });
        }
    })
    .catch(e => {
      res.status(404).send(e);
      console.log(e);
    })
});

//Edit a category

router.put("/:catID",auth_Admin, (req, res) => {
   
    console.log(req.params,req.body);
    console.log("reached h h h ");
    const catID = req.params.catID;
    const catName = req.body.catName;

    console.log(catID,catName);

    Category.updateOne({
        _id:catID
    },
    { $set:{catName} 
    },(err,reslt)=>{
       if(err) {
             res.status(404).send(e);
        }
         res.status(200).send({msg:"updated"})
    })
    
});
//Delete a category
router.delete("/:catID",auth_Admin, (req, res) => {
    console.log(req.params);
    const catID = req.params.catID;
    console.log(catID);
    Category.findByIdAndRemove({
        _id : catID
    })
    .then((reslt)=>{
        Book.remove({category:reslt.catName})
        .then(res2=>{
            res.status(200).send({msg:"deleted",reslt,res2});
        })
    })
    .catch((e)=>{
        res.status(404).send(e);
    })
});
//End of Routes for Category

module.exports = router;
