const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
      },
    MobileNumber:Number,
    Email: {
        type: String,
        required: true,
      },
    Password: {
        type: String,
        required: true,
      },
    avatar:String,
    phone:Number,
    Type:String,
    isBlock:Boolean,
    Fav:[]


})

module.exports=mongoose.model('user',userSchema)