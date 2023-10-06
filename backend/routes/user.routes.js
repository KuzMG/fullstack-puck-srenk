import express from 'express'
const userRouter = express()
import {userController} from "../controller/user.controller.js"


userRouter.post("/signIn",userController.signIn)
userRouter.post("/signUp",userController.signUp)
userRouter.delete("/delAccount/:name", userController.deleteAccount)
export default userRouter