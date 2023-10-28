import db from "../db.js"
import fs from "fs"
import __dirname from '../dirname.js';


class NoteController {
    async createNote(req, res) {
        const {name, text, name_user} = req.body
        const note = await db.query("INSERT INTO notes(name,txt,name_user) VALUES ($1,$2,$3) RETURNING *", [name, text, name_user])
        res.json(note)
    }

    async getAllCompleted(req, res) {
        const name_user =  req.query.name
        const note = await db.query("SELECT * FROM  notes WHERE active=FALSE AND name_user=$1", [name_user])
        res.json(note)
    }

    async getAllActive(req, res) {
        const name_user =  req.query.name
        const note = await db.query("SELECT * FROM  notes WHERE active=TRUE AND name_user=$1", [name_user])
        res.json(note)
    }

    async deleteNote(req, res) {
        const note =  req.query.note
        db.query("DELETE FROM notes WHERE id=$1", [note])
        fs.unlink('photo/'+note, (err) => {
            if (err && err.code != 'ENOENT') throw err;
        });
        res.status(200).end()
    }

    async changePhoto(req, res) {
        const note = req.query.note

        if(!filedata){
            res.status(400).send("ТЫ ДОЛБАЕБ???")
        }
        else {
            res.status(200).send("ФАЙЛ ЗАГРУЖЕН")
        }

    }

    async getPhoto(req,res){
        const note = req.query.note
        res.sendFile(__dirname+'/photo/'+note)

    }

    async changeImportance(req, res) {
        const note = req.query.note
        const importance = req.query.importance
        db.query("UPDATE notes SET importance=$1 WHERE id=$2", [importance,note])
        res.status(200).end()
    }

    async changeText(req, res) {
        const note = req.query.note
        const text = req.body.text
        db.query("UPDATE notes SET txt=$1 WHERE id=$2", [text,note])
        res.status(200).end()
    }

    async changeStatus(req, res) {
        const note = req.query.note
        const status = req.query.status
        db.query("UPDATE notes SET active=$1 WHERE id=$2", [status,note])
        res.status(200).end()
    }
}

export const noteController = new NoteController()