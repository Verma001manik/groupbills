const express = require('express');
const router = express.Router();
const fs = require('fs');
const DATA_FILE = 'bills.json';
const bills = readDataFromFile();
function readDataFromFile(){
    try{
        const data  = fs.readFileSync(DATA_FILE,'utf-8');
        return JSON.parse(data);

    }catch(error){
        console.log(error);
        return [];
    }
}

function writeDataToFile(data){
    try{
        fs.writeFileSync(DATA_FILE,JSON.stringify(data,null,2),'utf8');

    }catch(err){
        console.error("errror writing")
    }
}
router.get('/', (req,res)=>{
    res.send(bills)
})
router.post('/',(req,res)=>{
    const {date, amount}= req.body;
    console.log(date,amount)

    const bill = {
        id: bills.length + 1,
        date : date,
        amount: amount, 
    }

    bills.push(bill); // Add the new bill to the bills array
    writeDataToFile(bills);
    res.status(201).json(bill);
})
// In your server.js or router file
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
  
    // Find the bill with the specified ID and remove it from the bills array
    const index = bills.findIndex((bill) => bill.id === id);
    if (index !== -1) {
      bills.splice(index, 1);
      writeDataToFile(bills);
      res.sendStatus(204); // Send a successful "No Content" response
    } else {
      res.status(404).json({ message: 'Bill not found' });
    }
  });
  
module.exports = router;
