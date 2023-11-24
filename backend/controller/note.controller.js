import db from "../db.js"


class NoteController {
    async createNote(req, res) {
        const {name, text, name_user} = req.body
        const note = await db.query("INSERT INTO notes(name,txt,name_user) VALUES ($1,$2,$3) RETURNING *", [name, text, name_user])
        res.json(note)
    }

    async getAllCompleted(req, res) {
        const name_user = req.query.name
        const note = await db.query("SELECT name, first_date, last_date, id, txt FROM  notes WHERE active=FALSE AND name_user=$1 ORDER BY first_date DESC", [name_user])
        res.json(note)
    }

    async getAllActive(req, res) {
        const name_user = req.query.name
        const note = await db.query("SELECT name, first_date, id, txt FROM  notes WHERE active=TRUE AND name_user=$1 ORDER BY first_date DESC", [name_user])
        res.json(note)
    }

    async getSortActive(req, res) {
        const name_user = req.query.name
        const field = req.query.field
        const trend = req.query.trend
        const query = "SELECT name, first_date, id, txt FROM notes WHERE active=TRUE AND name_user='" + name_user + "' ORDER BY " + field + " " + trend
        const note = await db.query(query)
        res.json(note)
    }

    async getSortСompleted(req, res) {
        const name_user = req.query.name
        const field = req.query.field
        const trend = req.query.trend
        const query = "SELECT name, first_date, last_date, id, txt FROM notes WHERE active=FALSE AND name_user='" + name_user + "' ORDER BY " + field + " " + trend
        const note = await db.query(query)
        res.json(note)
    }


    async deleteNote(req, res) {
        const note = req.query.note
        db.query("DELETE FROM notes WHERE id=$1", [note])
        res.status(200).end()
    }

    async changeText(req, res) {
        const note = req.query.note
        const text = req.body.text
        db.query("UPDATE notes SET txt=$1 WHERE id=$2", [text, note])
        res.status(200).end()
    }

    async changeStatus(req, res) {
        const note = req.query.note
        db.query("UPDATE notes SET active=False, last_date=current_date WHERE id=$1", [note])
        res.status(200).end()
    }
}

export const noteController = new NoteController()