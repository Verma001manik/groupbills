const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URL;
mongoose.connect(url)
  .then(response=>{
    console.log("connected to mongodb");

  })
  .catch(error=>{
    console.log("error connecting to mongodb", error);

  })
const billSchema = new mongoose.Schema({
  
    date:{
      type: Date,
    },
    amount : Number
})



const Bill = mongoose.model('Bill', billSchema);


module.exports = Bill; // Export the Bill model