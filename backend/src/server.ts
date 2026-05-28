import express from 'express'
import { connectDB } from './config/db.js';
import assessmentRoutes from './routes/assessment_routes.js';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
  origin: "https://ai-assessment-creator-1-w44e.onrender.com",
  credentials: true
}));

app.use(express.json());
app.use("/api", assessmentRoutes);



const startServer = async() => {
    app.listen(PORT,() => {
    console.log(`Server is running at PORT ${PORT}`)
})
    await connectDB();
}

startServer();
