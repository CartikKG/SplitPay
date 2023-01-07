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
            required: true,
            ref:'groups'

        }],
        adminGroups:[{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'groups'}
        ], 
        friends:[{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users'
        }],
        personalexpense:[
            {
                date:{ type: Date, default: Date.now },
                title:String,
                totalBill:Number,
                
            }
        ],
        allexpense:[
            {
                date: { type: Date, default: Date.now },
                title:String,
                totalBill:Number,
                
            }
        ],
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