const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const perPage = 10;

router.get("/", (req, res, next) => {
    const page = req.query.page;
    Book.find()
        .skip((page > 0 ? ((page - 1) * perPage) : 0))
        .limit(perPage)
        .exec(function (err, data) {
            if (err) throw err;
            res.json(data)
        });
});
//change books state
router.put("/:bookName",(req,res,next)=>{
    const mode = req.query.mode;
    

})
//El fashii5 zyad
router.post("/:bookName",(req,res)=>{
    //add the review to book model
    let review = {userName : "zyad" , review : req.body.review} //req.user.firstName
            Book.updateOne({title : req.params.bookName} , { $push: { reviews: review } },(err,data)=>{
                res.send("done")
            });
})

module.exports = router;