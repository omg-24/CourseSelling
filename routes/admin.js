const {Router } = require("express")

const adminRouter = Router()

const {adminModel} = require("../db")
 
adminRouter.post('/signup',async function (req,res) {
    
})


adminRouter.get('/signin',async function (req,res) {
    
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