const mongoose=require('mongoose')

const userReviews= new mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,ref:"user"},
    serviceId:{type:mongoose.Schema.ObjectId,ref:"service"},
    Rating:Number,
    Title:String,
    Comment:String
})

module.exports=mongoose.model('reviews',userReviews)