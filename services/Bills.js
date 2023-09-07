const express = require('express');
const router = express.Router();
// const fs = require('fs');
const Bill = require('../models/Bill')





router.get('/', async(req,res)=>{

  try{
    const bills = await Bill.find({});
    // console.log("bills:",bills);
    res.status(200).json(bills);
  }
  catch(err){
    res.status(500).json({error: 'failed to retrieve bills'});
  }
    
})
router.post('/', async (req, res) => {
  try {
      const { date, amount } = req.body;
      // console.log(date, amount);

      const bill = new Bill({
          date: date,
          amount: amount,
      });

      console.log("bill", bill);

      await bill.save();
      res.status(201).json(bill);
  } catch (err) {
    console.log("errorposting ", err);
      res.status(500).json({ error: 'Failed to create a bill' });
  }
}); 

router.delete('/:id', async (req, res) => {
  try {
      const id = req.params.id;
      // console.log("id",id);

      const bill = await Bill.findByIdAndDelete(id);
      if (bill) {
          res.sendStatus(204); // Successful deletion
      } else {
          res.status(404).json({ message: 'Bill not found' });
      }
  } catch (err) {
    const id = req.params.id;
      console.log("errror id : ",id);
      console.log(err);
      res.status(500).json({ error: 'Failed to delete the bill' });
  }
});
module.exports = router;
