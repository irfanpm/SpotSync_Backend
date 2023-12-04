const express=require('express')
const admin=express.Router()
const {getAllService,getAllUser,unApprovedService,approvedService,getUserById,getUserService,getServiceById,getBlockedUser,isBlockService,isBlockUser,getBlockService,}=require('../controller/admin')
const adminAuth=require('../middleware/adminJWTAuthenticaton')
const errorMiddleware=require('../middleware/tryCatchMiddleware')

admin.get('/admin/getusers',adminAuth,errorMiddleware(getAllUser))
admin.get('/admin/getservices',adminAuth,errorMiddleware(getAllService))
admin.post('/admin/getservice',adminAuth,errorMiddleware(getServiceById))
admin.post('/admin/getuser',adminAuth,errorMiddleware(getUserById))
admin.post('/admin/getuserservice',adminAuth,errorMiddleware(getUserService))

admin.get('/admin/getblockuser',adminAuth,errorMiddleware(getBlockedUser))
admin.get('/admin/getblockservice',adminAuth,errorMiddleware(getBlockService))
admin.get('/admin/unapproved',unApprovedService),
admin.post('/admin/approved',approvedService)
admin.post('/admin/userblock',adminAuth,errorMiddleware(isBlockUser))
admin.post('/admin/serviceblock',adminAuth,errorMiddleware(isBlockService))



module.exports=admin