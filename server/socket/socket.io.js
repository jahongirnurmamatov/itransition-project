import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["https://itransition-project-nine.vercel.app/"],
		methods: ["GET", "POST"],
	},
});


export { app, io, server };