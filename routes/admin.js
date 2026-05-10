const {Router } = require("express")

const adminRouter = Router()
const {adminModel, courseModel} = require("../db")
const jwt = require("jsonwebtoken")
const { adminmiddleware } = require("../middleware/admin")
const admin = require("../middleware/admin")
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

adminRouter.post('/course',adminmiddleware, async function (req,res){
    const adminId = req.userId

    const { title,description,imageUrl,price } = req.body

    await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId:adminId
    })

    res.json({
        message:"Course created",
        courseID:courseModel._id
    })

})

adminRouter.put('/course',adminmiddleware, async function(req,res){
    const adminId = req.userId
    const { title,description,imageUrl,price,courseId } = req.body

    await courseModel.updateOne({
         _id: courseId,
         creatorId:adminId
        },{
            title,
            description,
            imageUrl,
            price
    })
    res.json({
        message: "Course Updated"
    })
})

adminRouter.get('/course/bulk',adminmiddleware, async function (req,res){
    const adminId = req.userId
    const allcourse = await courseModel.find({creatorId:adminId})

    res.json({
        allcourse
    })
})

module.exports = {
    adminRouter: adminRouter
}