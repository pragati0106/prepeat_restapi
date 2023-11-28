const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config();

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    },
    password:{
        type:String,
        required:true,
    },
    role: { type: String, default: 'user' },
    ownedRestaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
})




const User = mongoose.model('User', UserSchema)

module.exports = User


