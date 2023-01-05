const mongoose=require('mongoose');
const productSchema=new mongoose.Schema(
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
                date:new Date,
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
const Product = mongoose.model('products',productSchema);
module.exports=Product;

// owner : {
//     type: ObjectID,
//     required: true,
//     ref: 'users'
// },
// items: [{
//     itemId: {
//         type: ObjectID,
//         ref: 'products',
//         require:true
//     },
//     quantity:Number
   
// }],
// bill: {
//     type: Number,

// }