const joi = require('joi')
const AuthUser = joi.object({
    username:joi.string().required(),
    email:joi.string().lowercase(),
    mobilenumber:joi.number(),
    password:joi.string().required(),



})
module.exports={
    AuthUser
}