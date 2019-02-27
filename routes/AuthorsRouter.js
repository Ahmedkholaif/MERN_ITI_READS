const express = require("express");
const multer = require("multer");
const router = express.Router();
const Author = require('../models/Author');
const Cat = require('../models/Category');
const {auth_Admin} = require('../helpers/Auth');
//Start of Routes for Author

// Get all Author and display them

router.get('/', auth_Admin,(req, res) => {

  Author.find({})
    .then(authors => {
      Cat.find({}).then(cats => {
        res.status(200).send({ authors, cats });
      });
    })
    .catch(e => {
      res.status(404).send(e);
    });
});

// Add a new Author
// @ admin Auth
router.post('/', auth_Admin,(req, res) => {

  const body =JSON.parse(req.body.body);
  let img ;
  const fullName = body.fullName;
  const dateOfBirth = body.dateOfBirth;
  let uploadFile = req.files.file ;

  const fileName = `${new Date().toISOString()}${Math.random()}${req.files.file.name}` ;
 
  Author.findOne({fullName})
  .then(author => {
      if(author) {
        return res.status(400).json({err:" already exists "});
      }else {
        uploadFile.mv(
          `${__dirname}/../public/${fileName}`,(err)=> {
              
            if(err) {return res.status(500).send(err)}
            img =  `../../../${fileName}`;
            
            const author = new Author({
                fullName,
                img,
                dateOfBirth
                });
                console.log(author);
                author.save()
                .then(()=>{
                    res.status(200).send(author);
                })
                .catch((e)=>{
                    console.log(e);
                    res.status(404).send({  msg:'error' });
                })
          })  
        }
  });
})

// Edit an Author
//@ admin auth
router.put('/:name', auth_Admin,(req, res) => {

  const body =JSON.parse(req.body.body);
  let img ;
  const fullName = body.fullName;
  const dateOfBirth = body.dateOfBirth;
  let uploadFile = req.files.file ;

  const fileName = `${new Date().toISOString()}${Math.random()}${req.files.file.name}` ;
  uploadFile.mv(
    `${__dirname}/../public/${fileName}`,(err)=> {
        
      if(err) {return res.status(500).send(err)}
      img =  `../../../${fileName}`;
      Author.updateOne(
        {
          fullName: oldname
        },
        { $set: {
            fullName,
            img,
            dateOfBirth,
            }
        })
        .then(()=>{
            res.status(200).send({masg:"succes"});
        }) 
        .catch((e)=>{
            res.status(404).send(e);
        })
    }
  )
});
// Delete an Author
router.delete('/:name',auth_Admin ,(req, res) => {
  const name = req.params.name
  Author.deleteOne(
    {
      fullName: name
    })
    .then (()=>{
        res.status(200).send({msg:"succes"});
    })
    .catch((e)=>{
        res.status(404).send(e);
    })
});
// End of Routes for Author
module.exports = router;
