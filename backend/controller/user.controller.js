import db from "../db.js"

class UserController {
    async signIn(req, res) {
        const {name, password} = req.body
        let access = await db.query("SELECT (pswhash = crypt($2, pswhash)) AS login FROM users where name=$1", [name, password])
        if (access[0].login) {
            res.status(200).end()
        } else {
            res.status(400).end()
        }
    }


    async changePassword(req, res) {
        const {name, oldPassword, newPassword} = req.body
        console.log({name, oldPassword, newPassword})
        let access = await db.query("SELECT (pswhash = crypt($2, pswhash)) AS login FROM users where name=$1", [name, oldPassword])
        if (!access[0].login) {
            res.status(400).send("Неправильный пароль")
        } else {
            db.query("UPDATE users SET pswhash = crypt($2,gen_salt('md5')) WHERE name=$1", [name, newPassword]).then(v => {
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
                res.status(400).send("Такой юзер уже есть...")
        })
    }

    async deleteAccount(req, res) {
        const name = req.query.name
        db.query("DELETE FROM users WHERE name=$1", [name])
        res.status(200).end()
    }
}

export const userController = new UserController()