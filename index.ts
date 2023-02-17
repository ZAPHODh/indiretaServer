import express from 'express'
import router from './routes/Routes'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import { corsOpptions } from './utils/corsOptions'
dotenv.config({ path: '../.env' })

const app = express()

mongoose.connect(process.env.MONGO_CONNECT, (err) => {
    if (err) throw err
})
app.use(cors(corsOpptions))
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    }),
)
app.use('/', express.json(), router)

app.listen(process.env.PORT, () => {
    console.log(`Server running`)
})
