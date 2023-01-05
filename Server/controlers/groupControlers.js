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
  return Group.findById(id);
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

const createNewGroup = async (body, id) => {
  let ansa = await Group.create({
    title: body.title,
    img: body.img,
    description: body.description,
    brand: body.brand,
    price: body.price,
    strikedprice: body.strikedprice,
    product_type: body.product_type,
    department: body.department,
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
