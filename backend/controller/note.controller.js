import db from "../db.js"

class NoteController {
    async createNote(req, res) {
        const {name, text, name_user} = req.body
        const note = await db.query("INSERT INTO notes(name,txt,name_user) VALUES ($1,$2,$3) RETURNING *", [name, text, name_user])
        res.json(note)
    }

    async getAllCompleted(req, res) {

    }

    async getAllActive(req, res) {

    }

    async deleteNote(req, res) {

    }

    async changePhoto(req, res) {

    }

    async changeImportance(req, res) {

    }

    async changeText(req, res) {

    }

    async changeStatus(req, res) {

    }
}

export const noteController = new NoteController()