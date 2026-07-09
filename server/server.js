import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.config.js'
import authRouter from './routers/auth.route.js'
import userRouter from './routers/user.route.js'
import cors from 'cors'
import generateResponse from './config/oepnRouter.js'
import websiteRouter from './routers/website.route.js'
import billingRouter from './routers/billing.route.js'
const port = process.env.PORT || 3000

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

//Auth Routes

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/website', websiteRouter)
app.use('/api/billing', billingRouter)


app.listen(port, ()=>{
    connectDB()
    console.log(`server is running on port ${port}`)
})