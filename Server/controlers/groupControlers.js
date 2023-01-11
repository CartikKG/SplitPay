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
  return Group.find({"members.member":id}).populate('admin').populate('members.member').populate("bills.by");
  
};
const getcurrentGroupByID=(id)=>{
  return Group.findById(id).populate('admin').populate('members.member').populate("bills.by");;
}
// deletebillByID
const deletebillByID = async(itemId, groupId) => {
  let group=await Group.findOne({ _id:groupId}).populate('admin').populate('members.member').populate("bills.by");

  if (!group) {
    return "Group does not exist";
  }
  const itemIndex = group.bills.findIndex((item) => item._id == itemId);
  if(itemIndex>-1){
    group.bills.splice(itemIndex, 1);
    group.save();
    return group;
  }else{
    return "no item found"
  }

};
const JoinGroupbyId= async (groupId, id)=>{
    let group=await  Group.findOne({ _id:groupId});
    if(group){
          group.members.push({member:id})
          group.save();
          return group;
    }else{
      return "Invalid Joining Code"
    }
}

const patchcurrentGroupByID = async (title,date,totalBill,itemId,userId, id) => {
  const group=await  Group.findOne({ _id:id}).populate('admin').populate('members.member').populate("bills.by");;
  if (!group) {
    return "Group does not exist";
  }
  const itemIndex = group.bills.findIndex((item) => item._id == itemId) 
  if(itemIndex>-1){
    group.bills[itemIndex].bill.title=title;
    group.bills[itemIndex].bill.date=date;
    group.bills[itemIndex].bill.totalBill=totalBill;
    group.save();
    return group;
  }
};

const createNewGroup = async (title,type,img, userId) => {
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
// bills:[
//   {  
//    bill:{
//        date:Date,
//        title:String,
//        totalBill:Number,
//    },
//    by:{
//        type: ObjectID,
//        ref: 'users',
//        require:true
//      }
//   }
// ],
// balanceofUsers:[ 
//        { 
//            user:{type:ObjectID,ref:'users', require:true},
//            info:{title:String,youPay:Number,youTake:Number,payTo:String}
//        }
// ],
// grouptotal:{
//    type:Number
// }
const addDataGroup = async (title, date, totalBill,id,by)=>{
    let group=await Group.findOne({ _id:id}).populate('admin').populate('members.member').populate("bills.by");
      if(group){
        group.bills.push({bill:{date,title,totalBill},by})
       
        
        await group.save();
        let groups=await Group.findOne({ _id:id}).populate('admin').populate('members.member').populate("bills.by");
        return groups;
     

      }else{
        return "Group Not Found with Id";
      }
}

module.exports = {
  getAllGroup,
  getGroupByID,
  getcurrentGroupByID,
  patchcurrentGroupByID,
  addDataGroup,
  JoinGroupbyId,
  createNewGroup,
  deletebillByID
};
