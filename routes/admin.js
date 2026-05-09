const {Router } = require("express")

const adminRouter = Router()
const {adminModel} = require("../db")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD

 
adminRouter.post('/signup',async function (req,res) {
    try {
        const {email, password,firstName,lastName} = req.body;

        await adminModel.create({
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


adminRouter.post('/signin',async function (req,res) {
    try {
        const {email,password} = req.body;

        const admin = await adminModel.findOne({
            email : email,
            password : password
        })
        if(admin){
            const token = jwt.sign({
                id:admin._id,

            },JWT_ADMIN_PASSWORD);

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

adminRouter.post('/course', (req,res)=>{

})

adminRouter.put('/course', (req,res)=>{

})

adminRouter.get('/course/bulk', (req,res)=>{

})

module.exports = {
    adminRouter: adminRouter
}