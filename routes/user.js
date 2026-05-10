const {Router} = require("express")
const userRouter = Router()
const {userModel, purchaseModel} = require("../db")
const { userMiddleware } = require("../middleware/user")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD; 

userRouter.post('/signup',async function (req,res) {
    try {
        const {email, password,firstName,lastName} = req.body;

        await userModel.create({
            email,
            password,
            firstName,
            lastName
        })

        res.json({
            message:"signup successfull"
        })
    } catch (error) {
        res.status(500).json({
            message: "signup failed",
            error: error.message
        })
    }
})


userRouter.post('/signin',async function (req,res) {
    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({
            email : email,
            password : password
        })
        if(user){
            const token = jwt.sign({
                id:user._id,
            },JWT_USER_PASSWORD);

            res.json({
                token:token
            })
        }else{
            res.status(403).json({
                message: "Invalid Creadential"
            })
        }
    } catch (error) {
        
    }
})

userRouter.get('/purchases',userMiddleware,async function (req,res){
    const userId = req.userId
    
    const purchases = await purchaseModel.find({
        userId,
    })

    res.json({
        purchases
    })
})

module.exports = {
    userRouter: userRouter
}
