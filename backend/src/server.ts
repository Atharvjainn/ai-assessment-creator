import express from 'express'
import { PORT } from './config/env.js';
import { connectDB } from './config/db.js';
import assessmentRoutes from './routes/assessment_routes.js';

const app = express();
app.use(express.json());

app.use("/api",assessmentRoutes);

const startServer = async() => {
    app.listen(PORT,() => {
    console.log(`Server is running at PORT ${PORT}`)
})
    await connectDB();
}

startServer()