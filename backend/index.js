import express from 'express'
import multer from 'multer'
import userRouter from './routes/user.routes.js'
import noteRouter from './routes/note.routes.js'
const PORT = 8080;

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'photo')
    },
    filename: function (req, file, cb) {
        cb(null,String(req.query.note))
    }
})
function fileFilter (req, file, cb) {
    if(file.mimetype == 'image/jpeg' ||file.mimetype == 'image/png'){
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
app.use(express.json())
app.use(multer({storage:storage,fileFilter: fileFilter}).single("photo"));
app.use("/api",userRouter)
app.use("/api/note",noteRouter)
app.listen(PORT, () => console.log('server stated on PORT ' + PORT))
