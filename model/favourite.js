const mongoose=require('mongoose')

const Favourite= new mongoose.Schema({
    serviceId:{type:mongoose.Schema.ObjectId,ref:"service"},
    userId:Object,
})

module.exports=mongoose.model('favourite',Favourite)