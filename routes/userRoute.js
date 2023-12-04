var express = require("express")
var user = express.Router()
const { Login ,Register,Profile, searchService,editProfile,editavatar,findService,getService,review,displayreview,ratingAverage,favourite,showfavourite,showuserfavourite} = require('../controller/user')
const userAuth=require('../middleware/userJWTAuthentication')
const errorMiddleware=require('../middleware/tryCatchMiddleware')

user.post('/user/register',errorMiddleware(Register))
user.post('/user/login', errorMiddleware(Login))    
user.get('/user/profile',userAuth,errorMiddleware(Profile))
user.put('/user/profile/avatar',userAuth,errorMiddleware(editavatar))
user.put('/user/profile/edit',userAuth, errorMiddleware(editProfile))
user.post('/user/showservice',errorMiddleware(getService))
user.post('/user/findservice',errorMiddleware(findService))
user.post('/user/review',userAuth,errorMiddleware(review))
user.post('/user/displayreview',errorMiddleware(displayreview))
user.post('/user/avgreview',errorMiddleware(ratingAverage))
user.put('/user/favourite',userAuth,errorMiddleware(favourite))
user.get('/user/favourite',userAuth,errorMiddleware(showfavourite))
user.get('/user/userfavourite',userAuth,errorMiddleware(showuserfavourite))
user.post('/user/search',errorMiddleware(searchService))



module.exports=user