const Group=require('../models/group.model');
// const Group = require("../models/product.model");
const getAllGroup = async (page, limit, sortBy, _order, searchBy, q) => {
  let limitt = Number(limit);

  let skip = Number(limit) * (Number(page) - 1);
  let total = await Group.find({
    [searchBy]: { $regex: new RegExp(q) },
  }).count();
  let Data_r = await Group.find({ [searchBy]: { $regex: new RegExp(q) } })
    .skip(skip)
    .limit(limitt)
    .sort({
      [sortBy]: _order == "desc" ? -1 : 1,
    });
  return { total, Data_r };
};


const getGroupByID = (id) => {
  return Group.find({"members.member":id});
  
};
const deleteGroupByID = async (id, userId) => {
  let Group = await Group.findById(id);

  if (!Group) {
    return "Group does not exist";
  }

  if (String(Group.userId._id) !== String(userId)) {
    return "User can't delete the Group";
  }

  Group = await Group.findByIdAndDelete(id);

  return Group;
};
const patchGroupByID = async (id, patch, userId) => {
  const user = await Group.findById(id);
  let Group = await Group.findById(id);
  if (!Group) {
    return "Group does not exist";
  }

  if (String(Group.userId._id) !== String(userId)) {
    return "User can't edit the Group";
  }

  return Group.findByIdAndUpdate(id, patch, { new: true });
};

const createNewGroup = async (title,type,img, userId) => {
  // let group=await Group.findOne({admin:userId});
  let ansa = await Group.create({
    title:title,
    img: img,
    admin: userId,
    type: type,
    members: [{member:userId}],
    grouptotal: 0,
  });
  return ansa; 
  
};
module.exports = {
  getAllGroup,
  getGroupByID,
  deleteGroupByID,
  patchGroupByID,
  createNewGroup,
};
