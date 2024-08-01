import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { initializeSocket } from "./controller/socket.js";
const app = express();
const server = createServer(app);
const io = initializeSocket(server);
dotenv.config();

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("on port 8000")
    });



}

start();