import express from 'express'
import userRouter from './routes/user.routes.js'

const PORT = 8080;

const app = express();

app.use(express.json())
app.use("/api",userRouter)
app.listen(PORT, () => console.log('server stated on PORT ' + PORT))
