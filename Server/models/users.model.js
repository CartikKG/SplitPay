const mongoose=require('mongoose');

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,   
            require:true
        },
        avatar:{
            type:String,
            require:true
        },
        password:{
            type:String,
            select:false
        },
        group:[{  
            type:mongoose.Schema.Types.ObjectId,
            ref:'groups'

        }],
        adminGroups:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'groups'}
        ], 
        friends:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }],
        authType:{
            type:String,
        }
    },{
        versionKey:false,
        timestamps:true
    }
)
const User = mongoose.model('users',userSchema);
module.exports=User;