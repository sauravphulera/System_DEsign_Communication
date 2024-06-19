import bodyParser from "body-parser";
import express from "express";

import { createServer } from "node:http";


import { Server } from "socket.io";


const app = express();

const server = createServer(app);
const io = new Server(server);

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile('/Users/saurav.phulera/Desktop/Communication/web-sockets/index.html');
})

io.on('connection', (socket) => {
	console.log('Connection Established');
	socket.on('chat message', (msg) => {
		console.log('Server: ' + msg)
		io.emit('chat message', msg);
	})

	socket.on('disconnect', () => {
		console.log('User disconnected');
	})
})

server.listen(3000, () => {
	console.log(`Server Running at Port 3000`)
})