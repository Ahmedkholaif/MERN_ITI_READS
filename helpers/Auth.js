const User = require('../models/User');

const authenticate = (req,res,next )=> {
    const token =req.header('x-auth');
    User.findByToken(token)
    .then(user=>{
        if(!user){
            return Promise.reject();
        }else {
            req.token=token;
        req.user = user;
        next();
        }
    })
    .catch((e)=>{
        return res.status(401).send({
            err:"Authentication Failed"
        });
    });
}

const auth_Admin = (req,res,next )=> {
    
    const token =req.header('x-auth');

    
    User.findByToken(token)
    .then(user=>{
        if(!user){
            Promise.reject();
        }else {
            if(user.isAdmin) {
                req.token=token;
                req.user = user;
                next();
            }
            Promise.reject();
        }
    })
    .catch((e)=>{
        return res.status(401).send({
            err:"Authentication Failed"
        });
    });
}
module.exports={
    authenticate,
    auth_Admin,
}