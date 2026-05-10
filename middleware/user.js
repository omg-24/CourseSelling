const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_USER_PASSOWORD = process.env.JWT_USER_PASSOWORD
function userMiddleware(req,res,next){
    const token = req.headers.token
    const decoded = jwt.verify(token,JWT_USER_PASSOWORD)

    if(decoded){
        req.userId = decoded.id;
        next()
    }else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}