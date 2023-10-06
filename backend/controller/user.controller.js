import db from "../db.js"

class UserController {
    async signIn(req, res) {
        const {name, password} = req.body
        db.query("SELECT (pswhash = crypt($2, pswhash)) AS login FROM users where name=$1", [name, password]).then(v => {
            res.json(v[0])
        }, e => {
            console.log(e)
        })
    }

    async signUp(req, res) {
        const {name, password} = req.body
        db.query("INSERT INTO users (name,pswhash) VALUES ($1,crypt($2,gen_salt('md5')))", [name, password]).then(v => {

        }, e => {
            if (e.code =='23505')
                res.json('такой username уже существует')
        })
    }
}

export const userController = new UserController()