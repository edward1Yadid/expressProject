const config = require("config");
const PrivateKey = config.get("JWT_KEY");
const {handleError}=require("../utils/handleErrorsRequest");
const jwt = require("jsonwebtoken");
const tokenGenerator=config.get("TOKEN_GENERATOR")

const verifyUserByAuth=(tokenFromClient)=>{
    const payLoadUser = jwt.verify(tokenFromClient, PrivateKey);
    return payLoadUser
}
const authorizationForAccsesUser=(request,response,next)=>{
if(tokenGenerator==="jwt"){

try{
    const tokenFromUser=request.header("x-auth-token")

    if(!tokenFromUser)   return handleError(response, 401, 'Access denied. No token provided');
    const payLoadUser=verifyUserByAuth(tokenFromUser)
    if(!payLoadUser) return handleError(response, 400, 'invalid token');

request.userAuthorization=payLoadUser
return next()
}catch(error){

    return handleError(response, 401, error.message);
}

} else{
}
return handleError(response,500,"you dont use Jwt library")


}


exports.verifyUserByAuth=verifyUserByAuth

exports.authorizationForAccsesUser=authorizationForAccsesUser