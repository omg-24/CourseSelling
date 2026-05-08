const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")


const {createUserRoutes, userRouter} = require("./routes/user")
const {createCourseRoutes} = require("./routes/course")

const app = express()
app.use(express.json())

app.use('/user',userRouter)
app.use('/course',courseRouter)

createUserRoutes(app)
createCourseRoutes(app)



app.listen(3000)