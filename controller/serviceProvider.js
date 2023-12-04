const serviceSchema=require('../model/serviceProvider')
const userSchema=require('../model/user')
const userReview=require('../model/userReviews')

module.exports={
    serviceLogin:async(req,res)=>{
        const {phone}=req.body
        const service=await userSchema.findOne({_id:res.token})
        if(service.MobileNumber){
            if(service.MobileNumber==phone){
                res.status(200).json({
                    status: "success",
                    message: "successfully enter service",
                })
            }else{
                res.json({status:"failed",message:"the doesnot match"})
            }

        }else{
         await userSchema.findByIdAndUpdate(res.token,{$set:{MobileNumber:phone}})
         res.status(200).json({
            status: "success",
            message: "successfully Login",
        })
          

        }


    },





    addsevice :async(req,res)=>{

        const {servicename,phone,category,streetaddress,state,city,image,description,address,timing,whatsapp,email,website,long,lat,instagram,features}=req.body
        
      const service=  await serviceSchema.create({
            userId:res.token,
            serviceName:servicename,
            Phone:phone,
            Category:category,
            StreetAdrress:streetaddress,
            State:state,
            City:city,
            Description:description,
            Address:address,
            Timing:timing,
            Whatsapp:whatsapp,
            Email:email,
            Website:website,
            Instagram:instagram,
            Location:{
                type:"Point",
                coordinates:[parseFloat(long),parseFloat(lat)]
            },
            Features:features,
            Image:image,
            isBlock:false,
            isApproved:false
            
            

        })

        if(service.length!=0){
            res.status(200).json({
                status: "success",
                message: "successfully added service",
                data:service
        })
    }else{
        res.json('error')
    }


},
// addserviceImage:async(req,res)=>{
//     const {image}=req.body
//     const awa




// },
getService: async(req,res)=>{
    const getService= await serviceSchema.find({userId:res.token})
    if(getService.length!=0){
        res.status(200).json({
            status: "success",
            data: getService,
          });

    }else{
        res.json('error')

    }


},
deleteService:async(req,res)=>{
    const { serviceid }=req.body
    const service=await serviceSchema.findOne({_id:serviceid})
    if(service){

    const deletedservice= await serviceSchema.deleteOne({_id:serviceid})
    res.json(deletedservice)

    }else{
        res.json({message:"the user not available"})
    }




},
findService:async(req,res)=>{
    const { serviceid }=req.body
    const service=await serviceSchema.find({_id:serviceid})
    if(service){
        res.status(200).json({
            status: "success",
            data: service,
          });

    }else{
        res.json("service not available")
    }





},
editService:async(req,res)=>{
    const {serviceid,servicename,phone,category,streetaddress,state,city,image,description,address,timing,whatsapp,email,website,long,lat,instagram,features}=req.body
    const service = await serviceSchema.findOne({_id:serviceid})
    if(service){
        await serviceSchema.findByIdAndUpdate(serviceid,{$set:{
            userId:res.token,
            serviceName:servicename,
            Phone:phone,
            Category:category,
            StreetAdrress:streetaddress,
            State:state,
            City:city,
            Description:description,
            Address:address,
            Timing:timing,
            Whatsapp:whatsapp,
            Email:email,
            Website:website,
            Instagram:instagram,
            Location:{
                type:"Point",
                coordinates:[parseFloat(long),parseFloat(lat)]
            },
            Features:features,
            isApproved:false

         
            
        }
      
    })
    res.status(200).json({
        status: "success",
        message: "successfully added service",
        data:service
    })
    }else{
        res.json('failed')
    }



},
editserviceimg:async (req,res)=>{
    const {url,serviceid}=req.body
    const service=await serviceSchema.find({_id:serviceid})
    if(service){
      const deleteservice= await serviceSchema.findByIdAndUpdate(serviceid,{$pull:{Image:url }})
       if(deleteservice){
      
           res.status(200).json({
               status: "success",
               message: "successfully edit image",
               
           })

       
        
    }else{
        res.json("error")
    }


}
},
addserviceimg:async(req,res)=>{
    const { url ,serviceid}=req.body
    const service=await serviceSchema.find({_id:serviceid})
    if(service){
        const addimage= await serviceSchema.findByIdAndUpdate(serviceid,{$push:{Image:url }})
        if(addimage){
            res.status(200).json({
                status: "success",
                message: "successfully edit image",
                data:addimage
            })

        }

    }else{
        res.json("error")
    }
},
serviceReviews:async(req,res)=>{
    const servicereview=await userReview.find({userId:res.token}).populate(
        {
         path:'userId',
         model:"user"

        }).populate({
            path:"serviceId",
            model:"service"
        })
    if (servicereview){
        res.status(200).json({
            status: "success",
            message: "successfully fetched Reviews",
            data:servicereview.reverse()
        })
    }
}
}
