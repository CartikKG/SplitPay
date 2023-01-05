const mongoose=require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId

const groupSchema=new mongoose.Schema(
    {
        
        title:{
            type:String,
            require:true
        },
        img:{
            type:String,
            require:true
        },
        description:{
            type:String,
        },
        admin:{
              type:ObjectID,
              required: true,
              ref: 'users'
        },
        members:[{
                member: {
                        type: ObjectID,
                        ref: 'users',
                        require:true
                    }
                }
        ],
        bills:[
           {  
            bill:{
                type:Date,
                title:String,
                totalBill:Number,
            },
            by:{
                type: ObjectID,
                ref: 'users',
                require:true
              }
           }
        ],
        totalBill:{
            type:Number
        }

    },{
        versionKey:false,
        timestamps:true
    }
)
const Group = mongoose.model('groups',groupSchema);
module.exports=Group;