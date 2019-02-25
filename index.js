const express = require('express');
require('./mongo-conf.js');
const PORT = process.env.PORT || 3003 ;
const userRouter = require('./routes/UsersRouter');
const adminRouter = require('./routes/AdminRouter');
const userHomeRouter = require('./routes/userHomeRouter');

const app = express();

app.use(express.json());


app.use(express.static('public'))
app.use('/api/users',userRouter);
app.use('/api/admin',adminRouter);
app.use("/",userHomeRouter);

// app.use('/api',)//The home page






app.listen(PORT,()=>{
    console.log(`Server Started at port ${PORT}`);
});
