const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const personalExpense = new mongoose.Schema({
    owner : {
        type: ObjectID,
        required: true,
        ref: 'users'
    },
    personalexpense:[
        {
            date:Date,
            title:String,
            totalBill:Number,
            
        }
    ],
    allexpense:[
        {
            date:Date,
            title:String,
            totalBill:Number,
            
        }
    ],
    bill: {
        type: Number,

    }
}, {
    timestamps: true
})

const PersonalExpense = mongoose.model('Carts', personalExpense)

module.exports = PersonalExpense