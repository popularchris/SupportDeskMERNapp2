const mongoose=require('mongoose')

const noteSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    Ticket:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Tickets'
    },
    Text:{
        type:String,
        required:[true,'Please add some text']
    },
    isStaff:{
        type:Boolean,
        default:false
    },
    StaffId:{
        type:String,
        default:false
    }
},
{
    timestamps:true,
}
)
module.exports=mongoose.model('Note',noteSchema)