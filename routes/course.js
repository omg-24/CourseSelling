const {Router} = require("express")
const { purchaseModel, courseModel } = require("../db")
const courseRouter = Router()
const { userMiddleware } = require("../middleware/user")



    courseRouter.post('/purchases',userMiddleware, async function(req,res){
        const userId = req.userId
        const courseId = req.body.courseId

        await purchaseModel.create({
            userId,
            courseId
        })
        res.json({
            message: "You have successfully bought the course"
        })
    })

    courseRouter.get('/preview', async function(req,res){
        const allcourse = await courseModel.find({})

        res.json({
            allcourse
        })
    })


module.exports = {
    courseRouter: courseRouter
}