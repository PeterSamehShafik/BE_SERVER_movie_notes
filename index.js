import dotenv from 'dotenv'
dotenv.config({ path: "./config/.env" })

import express from 'express'
import { appRouter } from './src/modules/indexRouter.js';

//Constants
const app = express()
const port = process.env.PORT

//Routing configuration
appRouter(app)


//Run the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}!.........`)
})


