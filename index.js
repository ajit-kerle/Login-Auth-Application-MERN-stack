import express from 'express';
import connection from './db/conn.js';
import router from './routes/router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express()

// global middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/",router)


// DB connection 
connection()

// server 
const port=8000
app.listen(port,()=>{
    console.log(`server start at port no :${port}`)
})