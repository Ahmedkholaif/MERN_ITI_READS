const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


let data = {
    id:4
}
//data with user id =>token
let token = jwt.sign(data,'123abc');//secret
console.log(token);

// token =>verify
console.log(jwt.verify(token,'123abc'));
// const pass ='11235@as';

// bcrypt.genSalt(10 ,(err,salt) => {
//     bcrypt.hash(pass,salt,(err,result) => {
//         console.log(result);
//     })
// });

// let hashpass = '$2a$10$tGmSNbkAWpIJKzNJf9Ws7.QViCx2bfv0MP38VKGiY0s/PrkyUvQCa';

// bcrypt.compare(pass,hashpass,(err,result)=>{
//     console.log(result);
// })

// let data ={
//     id :4
// };
// let token = {
//     data,
//     hash,
// }