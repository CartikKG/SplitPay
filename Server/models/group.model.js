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
        admin:{
              type:ObjectID,
              required: true,
              ref: 'users'
        },
        type:{
              type:String,
              required: true,
              
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
                date:Date,
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
        balanceofUsers:[ 
                { 
                    user:{type:ObjectID,ref:'users', require:true},
                    info:{youPay:Number,youTake:Number,youGive:Number,takefrom:[{member:{type:ObjectID}}],payTo:[{member:{type:ObjectID}}]}
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