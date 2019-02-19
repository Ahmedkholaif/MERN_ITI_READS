const express = require ('express');
require('./mongo-conf.js');
const PORT = process.env.PORT || 3001 ;
const userRouter = require('./routes/UsersRouter');
const categoryRouter = require('./routes/CategoriesRouter');
const bookRouter = require('./routes/BooksRouter');
const authorRouter = require('./routes/AuthorsRouter');
const adminRouter = require('./routes/AdminRouter');

const app = express();

app.use(express.json());



app.use('/api/users',userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/categories',categoryRouter);
app.use('/api/books',bookRouter);
app.use('/api/authors',authorRouter);











app.listen(PORT,()=>{
    console.log(`Server Started at port ${PORT}`);
});
