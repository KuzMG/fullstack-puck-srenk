import express from 'express'
const userRouter = express()
import {userController} from "../controller/user.controller.js"

/*
    запрос:
    тело:
        name: String
        password: String
 */
userRouter.post("/signIn",userController.signIn)
/*
    запрос:
    тело:
        name: String
        password: String
 */
userRouter.post("/signUp",userController.signUp)
/*
    запрос:
        name: String (пользователь)
    тело:
 */
userRouter.delete("/delete", userController.deleteAccount)
export default userRouter