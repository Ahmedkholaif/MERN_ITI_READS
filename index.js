const express = require('express');
require('./mongo-conf.js');
const PORT = process.env.PORT || 3001 ;
const userRouter = require('./routes/UsersRouter');
const adminRouter = require('./routes/AdminRouter');
const userBookRouter = require('./routes/userBookRouter');

const app = express();

app.use(express.json());


app.use(express.static('public'))
app.use('/api/users',userRouter);
app.use('/api/admin',adminRouter);
app.use("/",userBookRouter);

// app.use('/api',)//The home page






app.listen(PORT,()=>{
    console.log(`Server Started at port ${PORT}`);
});
