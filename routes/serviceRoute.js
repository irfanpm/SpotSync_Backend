var express = require("express")
var service = express.Router()
const {addsevice,getService,serviceLogin,deleteService,editService,findService,editserviceimg,addserviceimg,serviceReviews}=require('../controller/serviceProvider')
const userAuth=require('../middleware/userJWTAuthentication')
const errorMiddleware=require('../middleware/tryCatchMiddleware')


service.post('/service/phone',userAuth,errorMiddleware(serviceLogin))
service.post('/service/addservice',userAuth,errorMiddleware(addsevice))
service.get('/service/showservice',userAuth,errorMiddleware(getService))
service.put('/service/deleteservice',userAuth,errorMiddleware(deleteService))
service.post('/service/findservice',userAuth,errorMiddleware(findService))
service.put('/service/editservice',userAuth,errorMiddleware(editService))
service.put('/service/deleteimage',userAuth,errorMiddleware(editserviceimg))
service.put('/service/addimage',errorMiddleware(addserviceimg))
service.get('/service/servicereviews',userAuth,errorMiddleware(serviceReviews))



module.exports=service