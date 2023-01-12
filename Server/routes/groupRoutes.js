const express = require("express");
const authorization = require("../middleware/authorization");
const Group = require("../controlers/groupControlers");
var nodemailer = require("nodemailer");
const route = express.Router();
// const axios=require('axios')
route.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "price",
    _order = "desc",
    searchBy = "title",
    q = "",
  } = req.query;
  try {
    const { total, Data_r } = await Group.getAllGroup(
      page,
      limit,
      sortBy,
      _order,
      searchBy,
      q
    );
    return res.status(200).send({
      searchBy: searchBy,
      q: q,
      sortBy: sortBy,
      _order: _order,
      totalResponse: total,
      limit: limit,
      page: page,
      data: Data_r,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.post("/:id", async (req, res) => {
  let {
    title,
    type,
    img = "https://s3.amazonaws.com/splitwise/uploads/group/default_avatars/avatar-orange26-other-50px.png",
  } = req.body;
  let userId = req.params.id;
  try {
    const data = await Group.createNewGroup(title, type, img, userId);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.post("/current/:id", async (req, res) => {
  let { title, date, totalBill, userId } = req.body;
  let groupId = req.params.id;
  try {
    const data = await Group.addDataGroup(
      title,
      date,
      totalBill,
      groupId,
      userId
    );
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.delete("/current/:id", async (req, res) => {
    // console.log("object-delet")
  let groupId = req.params.id;
  let {itemId} = req.body;
  try {
    const data = await Group.deletebillByID(itemId, groupId);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.delete("/admin/:id", async (req, res) => {
    console.log("object-delet")
  let groupId = req.params.id;
  let {userId} = req.body;
  try {
    const data = await Group.deletegroupsByID(groupId, userId);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

route.get("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const data = await Group.getGroupByID(id);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.get("/current/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const data = await Group.getcurrentGroupByID(id);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.patch("/current/:id", async (req, res) => {
   
  let id = req.params.id;
  let {title,date,totalBill,itemId,userId} =req.body;
  try {
    const data = await Group.patchcurrentGroupByID(title,date,totalBill,itemId,userId, id);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.post("/joining/:id", async (req, res) => {
  let id = req.params.id;
  let {groupId}=req.body;
  try {
    const data = await Group.JoinGroupbyId(groupId, id);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
route.post("/invite/:id", async (req, res) => {
  console.log("ok-2");
  let id = req.params.id;
  let { email, emailname, name, groupName } = req.body;

  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "splitpayinvite@gmail.com",
        pass: "nckhfmziqkshcvrg",
      },
    });

    var mailOptions = {
      from: "splitpayinvite@gmail.com",
      to: `${email}`,
      subject: "Invitation For join Group",
      text: `      
            `,
      html:`Hi,<h4>${emailname}</h4>,${name} is invited you to join group <h4>"${groupName}"</h4>
     Here is the joining code : - <h2> ${id}</h2><a href="https://splitpays.netlify.app/">splitpays.netlify.app</a>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send({ error: "Done" });
      } else {
        console.log("Email sent: " + info.response);
        res.send({ Done: "Done" });
      }
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = route;
