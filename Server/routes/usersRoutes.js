const express = require("express");
const Users = require("../controlers/userControlers");
const User = require("../models/users.model");
const authorization = require("../Middleware/authorization");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const data = await Users.getAllUser();
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.post("/register", async (req, res) => {
  let body = req.body;
  try {
    const data = await Users.registeredNewUser(body);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.post("/personal/:id", async (req, res) => {
  const owner = req.params.id;
  let { title,totalBill, date} = req.body;
 try {
  let user = await User.findOne({owner});

   if (user) {
    user.personalexpense.push({title,})
    // date:Date,
    // title:String,
    // totalBill:Number,
    //  let ind=-1;
    // for (let index = 0; index <cart.items.length; index++) {
    //  if(cart.items[index].itemId._id==itemId){
    //    ind = index;
    //    }
      
    // } 
    // if(ind==-1){
    //   cart.items.push({itemId,quantity});
    //   let bill=0;
    //   for (let index = 0; index <cart.items.length-1; index++) {
    //      bill+=cart.items[index].quantity*cart.items[index].itemId.price
    //   } 
    //   bill+=price*quantity;
    //   cart.bill=Number(bill);
    //   cart.save();
    //    return res.send({
    //       cart:cart
    //    })
    // }else{
    //   cart.items[ind].quantity=quantity;
    //   let bill=0;
    //   cart.items.forEach(element => {
    //     bill+=Number( element.quantity)* Number(element.itemId.price);
    //   });
    //   cart.bill=Number(bill);
    //   cart.save();
    //    return res.send({
    //       cart:cart
    //    })

    // }
  } else {
     return res.status(401).send({error:"user not found with given id"});
  }
} catch (error) {
  console.log(error);
  res.status(500).send({error:"something went wrong"});
}
});
route.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const data = await Users.deleteUserByID(id);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.patch("/:id", authorization, async (req, res) => {
  let id = req.params.id;
  let dataa = req.body;
  let users = req.user;
  try {
    const data = await Users.patchUserByID(id, dataa, users);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const data = await Users.getUserByID(id);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.get("/login/loggedInUser", authorization, (req, res) => {
  return res.send({
    data: req.user,
  });
});

route.post("/login", async (req, res) => {
  let bodys = req.body;
  try {
    const data = await Users.loginUser(bodys);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});


module.exports = route;
