const express=require('express');
const authorization = require('../Middleware/authorization');
const Group= require('../controlers/groupControlers')
const route=express.Router();
// const axios=require('axios')
route.get('/', async (req,res)=>{
    const {
        page=1,
        limit=20,
        sortBy="price",
        _order='desc',
        searchBy="title",
        q="",
    } =req.query
    try {
        const {total,Data_r}=await Group.getAllGroup(page,limit, sortBy, _order, searchBy,q);
        return res.status(200).send(
            {
                searchBy:searchBy,
                q:q,
                sortBy:sortBy,
                _order:_order,
                totalResponse:total,
                limit:limit,
                page:page,
                data:Data_r
            });
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
});
route.post('/:id', async (req,res)=>{
    let {title,type,img="https://s3.amazonaws.com/splitwise/uploads/group/default_avatars/avatar-orange26-other-50px.png"}=req.body;
    let userId=req.params.id;
    try {
        const data=await Group.createNewGroup(title,type,img,userId);
        return res.status(200).send({data});
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
});
route.post('/current/:id', async (req,res)=>{
    let { title, date, totalBill ,userId } = req.body;
    let groupId=req.params.id;
    // console.log("F")
    try {
        const data=await Group.addDataGroup(title, date, totalBill,groupId,userId);
        return res.status(200).send({data});
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
});
route.delete('/:id',authorization, async (req,res)=>{
     let id=req.params.id;
     let userId=req.user._id;
    try {
        const data=await Group.deleteGroupByID(id,userId);
        return res.status(200).send({data});
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
});
route.patch('/:id',authorization, async (req,res)=>{
     let id=req.params.id;
     let dataa=req.body;
     let userId=req.user._id;
    try {
        const data=await Group.patchGroupByID(id,dataa,userId);
        return res.status(200).send({data});
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
});
route.get('/:id', async (req,res)=>{
     let id=req.params.id;
    try {
        const data=await Group.getGroupByID(id);
        return res.status(200).send({data});
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
});
route.get('/current/:id', async (req,res)=>{
     let id=req.params.id;
    try {
        const data=await Group.getcurrentGroupByID(id);
        return res.status(200).send({data});
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
});

module.exports=route;