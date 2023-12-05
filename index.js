var express =require('express')
const api = express()
const cors=require('cors')
const  mongoose  = require('mongoose')
const userRoute=require('./routes/userRoute')
const serviceRouter=require('./routes/serviceRoute')
const adminRouter=require('./routes/adminRoute')
require("dotenv").config();

api.use(express.json())

mongoose.connect(process.env.MONGO_URL)
api.use(cors())
api.use('/api',userRoute,serviceRouter,adminRouter)
api.listen(process.env.PORT,()=>{
    console.log('http://127.0.0.1:8000');
})