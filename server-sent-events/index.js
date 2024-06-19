import bodyParser from "body-parser";
import express from "express";
import path from 'path';


const app = express();

app.use(bodyParser.json());


let data = 'initial data';

const waitingClients = [];

const __dirname = path.resolve(path.dirname(''));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})


app.get('/sse', (req, res) => {
	//sse logic
	res.setHeader('Content-Type', 'Text/event-stream');
	res.setHeader('Connection', 'keep-alive');
	res.setHeader('Cache-Control', 'no-cache');

	res.write('data: Welcome to server sent events \n\n');


	// can have db calls or some other service call this is just an example to show sse implementation, hence i am using timeout
	const interval = setInterval(() => {
		res.write(`data: Server Time ${new Date().toLocaleDateString()} \n\n`)
	}, 5000)
	req.on('close', () => {
		clearInterval(interval)
	})
})




const PORT = process.env.port || 5012;

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`)
})