import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import noteRouter from './routes/note.routes.js'
const PORT = 8080;
const app = express();

app.use(cors())
app.use(express.json())
app.use("/api",userRouter)
app.use("/api/note",noteRouter)
app.listen(PORT, () => console.log('server stated on PORT ' + PORT))
