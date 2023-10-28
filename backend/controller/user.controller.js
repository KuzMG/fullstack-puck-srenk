import db from "../db.js"
import fs from "fs"

class UserController {
    async signIn(req, res) {
        const {name, password} = req.body
        db.query("SELECT (pswhash = crypt($2, pswhash)) AS login FROM users where name=$1", [name, password]).then(v => {
            res.status(200).end()
        }, e => {
            console.log(e)
            res.status(500).end()
        })
    }


    async changePassword(req, res) {
        const {name, oldPassword, newPassword} = req.body
        let access = await db.query("SELECT (pswhash = crypt($2, pswhash)) AS login FROM users where name=$1", [name, oldPassword])

        let  ass = access[0].login
        console.log(ass)
        if (!access[0].login) {
            console.log("[eq]")
            res.status(200).send("Неправильный пароль")
        } else {
            console.log("ogogof")
            db.query("UPDATE users SET pswhash = crypt($2,gen_salt('md5')) WHERE name=$1",[name,newPassword]).then(v=> {
                console.log("ok")
                res.status(200).end()
            }, e => {
                console.log("error")
                res.status(500).end()
            })
        }
    }

    async signUp(req, res) {
        console.log(req.body)
        const {name, password} = req.body
        db.query("INSERT INTO users (name,pswhash) VALUES ($1,crypt($2,gen_salt('md5')))", [name, password]).then(v => {
            res.status(200).end()
        }, e => {
            if (e.code == '23505')
                res.send('такой username уже существует')
        })
    }

    async deleteAccount(req, res) {
        const name = req.query.name
        const photos = await db.query("SELECT id FROM notes WHERE name_user=$1", [name])
        console.log(photos)
        db.query("DELETE FROM users WHERE name=$1", [name])
        for (let i = 0; i < photos.length; i++) {
            fs.unlink('photo/' + photos[i].id, (err) => {
                if (err && err.code != 'ENOENT') throw err;
            });
        }
        res.status(200).end()
    }
}

export const userController = new UserController()