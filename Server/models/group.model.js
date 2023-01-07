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
                date:{ type: Date, default: Date.now },
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
        grouptotal:{
            type:Number
        }

    },{
        versionKey:false,
        timestamps:true
    }
)
const Group = mongoose.model('groups',groupSchema);
module.exports=Group;