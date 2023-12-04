const serviceSchema = require('../model/serviceProvider')
const userSchema=require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports={
    
getAllUser:async(req,res)=>{
    try {
        const page = req.query.page || 1;
        const itemsPerPage = 8;
        const skip = (page - 1) * itemsPerPage;
    
        const adminUsers = await userSchema.find().skip(skip).limit(itemsPerPage);
    
        if (adminUsers.length === 0) {
          return res.status(404).json({
            status: "fail",
            message: "No users found.",
          });
        }
    
        const totalUsers = await userSchema.countDocuments();
        const totalPages = Math.ceil(totalUsers / itemsPerPage);
    
        return res.status(200).json({
          status: "success",
          message: "Successfully fetched user data.",
          data: adminUsers,
          totalPages: totalPages,
        });
      } catch (error) {
        console.error("Error fetching user list:", error);
    
        // Handle specific Mongoose errors//
        if (error.name === "MongoError" && error.code === 13) {
          return res.status(500).json({
            status: "error",
            message: "Database authentication error",
          });
        }
        return res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      }
},
getAllService:async(req,res)=>{
    const service=await serviceSchema.find()
    if(service){
        res.status(200).json({
            status: "success",
            message: "successfully fetched service",
            data:service
           
          });
    }else{
        res.json({
            message:"failed"
        })
    }

},
getBlockedUser:async(req,res)=>{
    const user=await userSchema.find({isBlock:true})
    if(user){
        res.status(200).json({
            status: "success",
            message: "successfully fetched user data",
            data: user,
          });
    }else{
        res.json({
            message:"failed"
        })
    }
},
getServiceById: async(req,res)=>{
    const {id}=req.body
    const service=await serviceSchema.find({_id:id})
    if(service){
        res.status(200).json({
            status: "success",
            message: "successfully fetched user data",
            data: service,
          });

    }

},
getUserById: async(req,res)=>{
    const {id}=req.body
    const user=await userSchema.find({_id:id})
    if(user){
        res.status(200).json({
            status: "success",
            message: "successfully fetched user data",
            data: user,
          });

    }

},
getBlockService: async(req,res)=>{
    const service=await serviceSchema.find({isBlock:true})
    if(service){
        res.status(200).json({
            status: "success",
            message: "successfully fetched user data",
            data: service,
          });

    }

},
getUserService: async(req,res)=>{
    const {id}=req.body
    const getService= await serviceSchema.find({userId:id})
    if(getService.length!=0){
        res.status(200).json({
            status: "success",
            data: getService,
          });

    }else{
        res.json('error')

    }


},
getCategoryService:async(req,res)=>{
    const {category}=req.body
    const service=await serviceSchema.find({Category:category})
    if(service){
        res.status(200).json({
            status: "success",
            message: "successfully fetched category data",
            data: service,

          });

    }else{
        res.json({
            message:"failed"
        })

    }
},
isBlockUser:async(req,res)=>{
    const {id}=req.body
    const user=await userSchema.findOne({_id:id})
    if(user){
        if(user.isBlock==false){
            user.isBlock=true
            user.save()
          return  res.status(200).json({
                status: "success",
                message: "successfully block user ",
                data:user.isBlock
    
              });
     

        }else{
            user.isBlock=false
            user.save()
          return  res.status(200).json({
                status: "success",
                message: "successfully unblock user ",
                data:user.isBlock
    
              });
        }
      
        

}else{
    res.json({
        status:"failure",
        message:"data already exist in database",


    })
}


},
isBlockService:async(req,res)=>{
    const{id}=req.body
    const user=await serviceSchema.findOne({_id:id})
    if(user){
        if(user.isBlock==false){
            user.isBlock=true
           await user.save()
          return  res.status(200).json({
                status: "success",
                message: "successfully block service "
    
              });
     

        }else {
            user.isBlock=false
            await user.save()
return res.status(200).json({
                status: "success",
                message: "successfully unblock service"

              });
        }
      
        

}else{
    res.status(409).json({
        status:"failure",
        message:"data already exist in database",


    })
}

    

},
unApprovedService:async(req,res)=>{
    const service=await serviceSchema.find({isApproved:false})
    if(service){
        res.status(200).json({
            status: "success",
            message: "successfully fetched unapproved service",
            data:service

          });

    }

},
approvedService:async(req,res)=>{
    const {id}=req.body
    const service = await serviceSchema.findOne({_id:id})
    if(service){
        console.log(service)
        service.isApproved=true
        await service.save()
        return  res.status(200).json({
            status: "success",
            message: "successfully Approved service "

          });
 
    }else{
      res.json('faled')
    }
}








}



