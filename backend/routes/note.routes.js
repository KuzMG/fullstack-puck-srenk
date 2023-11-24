import express from 'express'
const noteRouter = express()
import {noteController} from "../controller/note.controller.js"

/*
    запрос:
    тело:
        name: String (название заметки)
        text: String (текст заметки)
        name_user: String (пользователь)
 */
noteRouter.post("/create",noteController.createNote)
/*
    запрос:
        name: String (ползователь)
    тело:
 */
noteRouter.get("/completed",noteController.getAllCompleted)
/*
    запрос:
        name: String (ползователь)
        field: String (поле)
        trend: String (направление)
    тело:
 */
noteRouter.get("/completed/sortered", noteController.getSortСompleted)
/*
    запрос:
        name: String (ползователь)
    тело:
 */
noteRouter.get("/active", noteController.getAllActive)
/*
    запрос:
        name: String (ползователь)
        field: String (поле)
        trend: String (направление)
    тело:
 */
noteRouter.get("/active/sortered", noteController.getSortActive)
/*
    запрос:
        note: Int (id заметки)
    тело:
 */
noteRouter.delete("/delete", noteController.deleteNote)
/*
    запрос:
        note: Int (id заметки)
    тело:
        text: String (текст заметки)
 */
noteRouter.put("/change/text", noteController.changeText)
/*
    запрос:
        note: Int (id заметки)
    тело:
 */
noteRouter.put("/change/status", noteController.changeStatus)

export default noteRouter