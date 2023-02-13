import morgan from 'morgan'
import express from 'express'

import cors from 'cors'
import authRouter from './auth/auth.router.js';
import noteRouter from './note/note.router.js';
import { globalErrorHandling } from '../middleware/errorHandling.js';
import connectDB from '../../DB/connection.js'


export const appRouter = (app) => {

    //Dev options
    if (process.env.MODE === 'DEV') {
        app.use(morgan("dev"))
    }

    //CORS
    app.use(cors())

    //Convert buffer data
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))

    //baseURL
    const baseURL = process.env.BASEURL

    //API Routing
    app.use(`${baseURL}/auth`, authRouter)
    app.use(`${baseURL}/note`, noteRouter)

    //In-valid routing handling
    app.use('*', (req, res, next) => {
        // res.status(404).json({ message: "404 Page not found", details: "In-valid Routing or method" })
        next(Error("404 Page not found In-valid Routing or method", { cause: 404 }))
    })

    //global error handling
    app.use(globalErrorHandling)

    //Establish database connection 
    connectDB()

}


/*  if needed
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.import connectDB from './../../DB/connection';
/config/.env') })import { globalErrorHandling } from './../middleware/errorHandling';

*/ 