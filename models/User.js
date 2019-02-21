const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const validator  = require('validator');

const userSchema =new mongoose.Schema({
    firstName:{
        type:"string",required:true
    },
    lastName:{
        type:"string",required:true
    },
    email:{
        type:"string", //match: "^(w+\.)+[w]+@[w]+\.[w]$" ,
        required:true,
        unique:true,
        validate:{
            validator: validator.isEmail,
            msg:`not a valid email`

        }
    },
    password:{
        type:"string",required:true,minlength:6
    },
    imgSrc:String,
    books:[{
        book:{type:mongoose.Types.ObjectId,ref:'Book'},rate:Number,shelve:''
    }],
    tokens:[{
        access:{
            type:"string",required:true
        },
        token:{
            type:"string",required:true
        }
    }],
    isAdmin:false
});


//mongo middleware --password encryption
userSchema.pre('save',function (next){  // middleware
    let user = this ;
    if(user.isModified('password')) {
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password=hash;
                next();
            })
        })
    }
    else {
        next();
    }
});

// override the data sent back to the user

userSchema.methods.toJSON =function () {
    const user = this;
    let userObject = user.toObject();

    return _.pick(userObject,['_id','email']);
}
userSchema.methods.getAuthToken = function () {
    const user =this;
    let access = 'auth';
    let token =jwt.sign({_id: user._id.toHexString(),access},'abc').toString(); 
    user.tokens.push({access,token});
   
    return user.save()
    .then(()=>{
        return token;
    });
}
const User = new mongoose.model('User',userSchema);

// user1 =new User({
//   firstName:'ahmed',lastName:'kholaif',email:'ahmd@yahoo.com',imgSrc:"hgfhfhfhf",
//   password:'1111111',books:[],tokens:[]  
// });
// console.log(user1);
// user1.save(err=> {if(err) console.log(err);});

module.exports = User;