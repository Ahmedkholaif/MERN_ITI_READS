const express = require('express');
require('./mongo-conf.js');
const PORT = process.env.PORT || 3002 ;
const userRouter = require('./routes/UsersRouter');
const adminRouter = require('./routes/AdminRouter');
const fileUpload = require('express-fileupload');
const app = express();

app.use(express.json());
app.use(fileUpload());

app.use(express.static('public'));
app.use('/api/users',userRouter);
app.use('/api/admin',adminRouter);

app.post("/uploader",(req,res)=>{

    console.log("reached uploader");
    // console.log(req,req.files,req.files.file);
    console.log(req.body);
    body =JSON.parse(req.body.body);
    console.log(body);
    // console.log(req);
    console.log(__dirname);
    let uploadFile = req.files.file ;
    const fileName = `${new Date().toISOString()}${Math.random()}${req.files.file.name}` ;
    uploadFile.mv(
        
        `${__dirname}/public/${fileName}`,
        function (err) {
        if (err) {
        return res.status(500).send(err)
        }

        res.json({
            path: `../../../${fileName}`,
        })
        },
    )
})

app.use('/image', express.static(__dirname + '/'));

app.get('/image',(req,res)=>{
    console.log(req.params,req.query);
    const imgSrc = req.query.name;
    res.json(`${imgSrc}`);
})

// app.use('/api',)//The home page
//----------------User routes ------------------------
//use PUT : /api/users/current/ratedbook?mode=rating&rate=4 for rating ( ratedbook is the book name)
//use PUT : /api/users/current/read?mode=reading            to edit shelve (read is the book name)
//use GET : /api/users/current/?mode=reading                to get reading books
//use GET : /api/users/current/                             to get all book
//use GET : /api/users/current/categories                   to get categories
//use GET : /api/users/current/categories/categoryName      to get one category
//use GET : /api/users/current/authors                      to get authors
//use GET : /api/users/current/authors/authorNAme           to get one author
//----------------admin routes ------------------------
//use GET : /api/admin/books                                to get all books
//use POST : /api/admin/books                               to add  book
//use PUT : /api/admin/books/bookTitle                      to edit book
//use DELETE : /api/admin/books/booktitle                   to delete book
//use GET : /api/admin                                      to get one author
//use GET : /api/admin                                      to get one author
//use GET : /api/admin                                      to get one author
//use GET : /api/admin                                      to get one author
//use GET : /api/admin                                      to get one author







app.listen(PORT,()=>{
    console.log(`Server Started at port ${PORT}`);
});
