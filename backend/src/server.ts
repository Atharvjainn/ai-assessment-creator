import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { connectDB } from './config/db.js';
import assessmentRoutes from './routes/assessment_routes.js';
import cors from 'cors'
import { Redis } from 'ioredis'
import { REDIS_PUBLIC_URL } from './config/env.js'

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use("/api", assessmentRoutes);

const redisSub = new Redis(REDIS_PUBLIC_URL!);

redisSub.subscribe("assignment:updates", (err) => {
  if (err) console.error("Redis subscribe error:", err);
  else console.log("Subscribed to assignment:updates channel");
});

redisSub.on("message", (channel, message) => {
  if (channel === "assignment:updates") {
    const payload = JSON.parse(message);
    io.to(payload.assignmentId).emit("assignment:updated", payload);
  }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  
  socket.on("watch:assignment", (assignmentId: string) => {
    socket.join(assignmentId);
    console.log(`Socket ${socket.id} watching assignment ${assignmentId}`);
  });

  socket.on("unwatch:assignment", (assignmentId: string) => {
    socket.leave(assignmentId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const startServer = async () => {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
};

startServer();