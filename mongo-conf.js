<<<<<<< HEAD
const mongoose = require("mongoose");
// const MONGO_URL = process.env.MONG_URL || 'mongodb://localhost:27017/ITI_READS' ;
const MONGO_URL =
  "mongodb+srv://root:mernITI39@coderm-om0sg.gcp.mongodb.net/mernDB?retryWrites=true";
=======
const mongoose = require('mongoose'); 
// const MONGO_URL = process.env.MONG_URL || 'mongodb://localhost:27017/ITI_READS' ; 
const MONGO_URL ='mongodb+srv://root:mernITI39@coderm-om0sg.gcp.mongodb.net/mernDB?retryWrites=true' ; 
>>>>>>> 76f0d64e0e6ee1f7083e441ec9e7662fe6cccf6e

mongoose.connect(
  MONGO_URL,
  {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
  },
  err => {
    if (!err) console.log("Mongo DB is connected ....");
    else console.log(err);
  }
);
