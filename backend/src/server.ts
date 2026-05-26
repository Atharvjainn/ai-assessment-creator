import express from 'express'
import { PORT } from './config/env.js';
import { connectDB } from './config/db.js';

const app = express();

app.use(express.json());

const startServer = async() => {
    app.listen(PORT,() => {
    console.log(`Server is running at PORT ${PORT}`)
})
    await connectDB();
}

startServer()