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
  return Group.find({"members.member":id}).populate('admin').populate('members.member').populate("bills.by").populate("balanceofUsers.user");
  
};
const getcurrentGroupByID=(id)=>{
  return Group.findById(id).populate('admin').populate('members.member').populate("bills.by").populate("balanceofUsers.user");;
}
// deletebillByID
const deletebillByID = async(itemId, groupId) => {
  let group=await Group.findOne({ _id:groupId}).populate('admin').populate('members.member').populate("bills.by").populate("balanceofUsers.user");

  if (!group) {
    return "Group does not exist";
  }
  const itemIndex = group.bills.findIndex((item) => item._id == itemId);
  if(itemIndex>-1){
    group.bills.splice(itemIndex, 1);
    let arr=[];
    group.members.forEach((element) => {
     arr.push({
        user:element.member._id,
        info:{
        youPay:0,
        youTake:0,
        youGive:0,
        takefrom:[],
        payTo:[],
      }
    })
    });
    let totalAmount=0;
   for (let index = 0; index < group.bills.length; index++) {
          let id=group.bills[index].by._id;
          totalAmount+=Number(group.bills[index].bill.totalBill);
          for (let inde = 0; inde < arr.length; inde++) {
            if( String(arr[inde].user)==String(id)){
              // console.log("object-OKS")
                 arr[inde].info.youPay=group.bills[index].bill.totalBill+arr[inde].info.youPay;
             }
          }
    }
    let equal=Math.round( totalAmount/group.members.length);
    for (let index = 0; index < arr.length; index++) {
      if(arr[index].info.youPay>equal){
        arr[index].info.youTake=arr[index].info.youPay-equal;
      }else{
        arr[index].info.youGive=equal-arr[index].info.youPay;
      }
    }
    group.balanceofUsers=arr;
    group.grouptotal=totalAmount;
    await group.save();
    let groups=await Group.findOne({ _id:groupId}).populate('admin').populate('members.member').populate("bills.by").populate("balanceofUsers.user");
    return groups;
 
  }else{
    return "no item found"
  }

};
const JoinGroupbyId= async (groupId, id)=>{
    let group=await  Group.findOne({ _id:groupId});
    if(group){
      let flag=false;
        group.members.forEach((element) => {
          if(String(element.member._id)==String(id)){
            flag=true;
          }
       });
       if(!flag){
          group.members.push({member:id})
          group.save();
          return group;
       }else{
        return "already Added"
       }
          
    }else{
      return "Invalid Joining Code"
    }
}

const patchcurrentGroupByID = async (title,date,totalBill,itemId,userId, id) => {
  const group=await  Group.findOne({ _id:id}).populate('admin').populate('members.member').populate("bills.by").populate("balanceofUsers.user");
  if (!group) {
    return "Group does not exist";
  }
  const itemIndex = group.bills.findIndex((item) => item._id == itemId) 
  if(itemIndex>-1){
    group.bills[itemIndex].bill.title=title;
    group.bills[itemIndex].bill.date=date;
    group.bills[itemIndex].bill.totalBill=totalBill;
    let arr=[];
    group.members.forEach((element) => {
     arr.push({
        user:element.member._id,
        info:{
        youPay:0,
        youTake:0,
        youGive:0,
        takefrom:[],
        payTo:[],
      }
    })
    });
    let totalAmount=0;
   for (let index = 0; index < group.bills.length; index++) {
          let id=group.bills[index].by._id;
          totalAmount+=Number(group.bills[index].bill.totalBill);
          for (let inde = 0; inde < arr.length; inde++) {
            if( String(arr[inde].user)==String(id)){
              // console.log("object-OKS")
                 arr[inde].info.youPay=group.bills[index].bill.totalBill+arr[inde].info.youPay;
             }
          }
    }
    let equal=Math.round( totalAmount/group.members.length);
    for (let index = 0; index < arr.length; index++) {
      if(arr[index].info.youPay>equal){
        arr[index].info.youTake=arr[index].info.youPay-equal;
      }else{
        arr[index].info.youGive=equal-arr[index].info.youPay;
      }
    }
    group.balanceofUsers=arr;
    group.grouptotal=totalAmount;
    await group.save();
    let groups=await Group.findOne({ _id:id}).populate('admin').populate('members.member').populate("bills.by").populate("balanceofUsers.user");
    return groups;
 
  }else{
    return "item not found"
  }
};
const deletegroupsByID=async(id, userId)=>{
  return Group.findOneAndDelete(id);
}
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

const addDataGroup = async (title, date, totalBill,id,by)=>{
    let group=await Group.findOne({ _id:id}).populate('admin').populate('members.member').populate("bills.by").populate("balanceofUsers.user");

      if(group){
        group.bills.push({bill:{date,title,totalBill},by})
        let arr=[];
        group.members.forEach((element) => {
         arr.push({
            user:element.member._id,
            info:{
            youPay:0,
            youTake:0,
            youGive:0,
            takefrom:[],
            payTo:[],
          }
        })
        });
        let totalAmount=0;
       for (let index = 0; index < group.bills.length; index++) {
              let id=group.bills[index].by._id;
              totalAmount+=Number(group.bills[index].bill.totalBill);
              for (let inde = 0; inde < arr.length; inde++) {
                if( String(arr[inde].user)==String(id)){
                  // console.log("object-OKS")
                     arr[inde].info.youPay=group.bills[index].bill.totalBill+arr[inde].info.youPay;
                 }
              }
        }
        let equal=Math.round( totalAmount/group.members.length);
        for (let index = 0; index < arr.length; index++) {
          if(arr[index].info.youPay>equal){
            arr[index].info.youTake=arr[index].info.youPay-equal;
          }else{
            arr[index].info.youGive=equal-arr[index].info.youPay;
          }
        }
        group.balanceofUsers=arr;
        await group.save();
        group.grouptotal=totalAmount;
        let groups=await Group.findOne({ _id:id}).populate('admin').populate('members.member').populate("bills.by").populate("balanceofUsers.user");
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
  deletebillByID,
  deletegroupsByID
};
