import express from 'express'
const noteRouter = express()
import {noteController} from "../controller/note.controller.js"

noteRouter.post("/create",noteController.createNote)

noteRouter.get("/completed/:name",noteController.getAllCompleted)
noteRouter.get("/active/:name", noteController.getAllActive)

noteRouter.delete("/:note", noteController.deleteNote)

noteRouter.put("/change/photo/:note", noteController.changePhoto)
noteRouter.put("/change/importance/:note", noteController.changeImportance)
noteRouter.put("/change/text/:note", noteController.changeText)
noteRouter.put("/change/status/:note", noteController.changeStatus)

export default noteRouter