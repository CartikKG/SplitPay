const express = require("express");
const PersonalExpense = require("../models/personalExpense");
// const Item = require("../models/product.model");
const Auth = require("../Middleware/authorization");

const router = new express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await PersonalExpense.find();
    res.status(200).send({data:data});
   
  } catch (error) {
    res.status(500).send({error:"Not Found"});
  }
});
router.get("/:id", async (req, res) => {
  const owner = req.params.id;
  try {
    const data = await PersonalExpense.findOne({owner})
      res.status(200).send({data});
   } catch (err) {
    res.status(500).send({error:"Something went wrong"});
  }
});
router.patch("/:id", async (req, res) => {
   const owner = req.params.id;
   const  { title, date, totalBill, itemId } = req.body
 
  try {
    const personalExpense = await PersonalExpense.findOne({owner})
    const itemIndex = personalExpense.personalexpense.findIndex((item) => item._id == itemId) 
    console.log(itemIndex)
    if (itemIndex > -1) {
     
      personalExpense.personalexpense[itemIndex].date=date;
      personalExpense.personalexpense[itemIndex].title=title;
      personalExpense.personalexpense[itemIndex].totalBill=totalBill;
      personalExpense.bill = personalExpense.personalexpense.reduce((acc, curr) => {
        return acc + curr.totalBill ;
      },0)
      personalExpense = await personalExpense.save();

      res.status(200).send({data:personalExpense});
    } else {
    res.status(404).send({error:"item not found"});
    }
      
   } catch (err) {
    res.status(500).send({error:"Something went wrong"});
   }
});
router.post("/personal/:id", async (req, res) => {
   const owner = req.params.id;
   let { title, date, totalBill  } = req.body;
   try {
    let personal= await PersonalExpense.findOne({owner});
   if (personal) {
     personal.personalexpense.push({title, date, totalBill})
     personal.bill =Number(personal.bill)+Number( totalBill),
     personal.save();
     return res.send({date:personal});

    } else {
    
    const newPersonalExpense = await PersonalExpense.create(
        {owner,
        personalexpense: [{ title, date, totalBill }],
        bill: totalBill,
      });
      return res.status(201).send({data:newPersonalExpense});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({error:"something went wrong"});
  }
});
router.delete("/:id", async (req, res) => {
  const owner = req.params.id;
  const itemId = req.body;
  // console.log(itemId);
  try {
    const personalExpense = await PersonalExpense.findOne({ owner });
    
    const itemIndex = personalExpense.personalexpense.findIndex((item) => item._id == itemId) 
    
    console.log("ok") ;
    if (itemIndex > -1) {
      console.log("ok-2") ;
      let item = personalExpense.personalexpense[itemIndex];
      personalExpense.bill -= item.totalBill;
      if(Number( personalExpense.bill) < 0) {
        Number( personalExpense.bill)  = 0
      } 
      personalExpense.personalexpense.splice(itemIndex, 1);
      personalExpense.bill = personalExpense.personalexpense.reduce((acc, curr) => {
        return acc + curr.totalBill ;
    },0)
      personalExpense = await personalExpense.save();

      res.status(200).send({data:personalExpense});
    } else {
    res.status(404).send({error:"item not found"});
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({error:error});
  }
});


router.delete("/blank/:id", async (req, res) => {
  const owner = req.params.id;
 try {
    let cart = await PersonalExpense.findOne({ owner }).populate("items.itemId");
    cart.bill = 0;
    cart.items=[];
    cart = await cart.save();
    res.status(200).send({cart});
 } catch (error) {
     res.status(400).send({error:error});
  }
});



module.exports = router;
