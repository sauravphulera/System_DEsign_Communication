import bodyParser from "body-parser";
import express from "express";


const app = express();


app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile('/Users/saurav.phulera/Desktop/Communication/web-sockets/index.html');
})

app.post('/webhook', (req, res) => {
	const payload = req.body;
	//authentication

	console.log(payload)

	res.status(200).send("Webhooks recieve successfully")
})


app.listen(3000, () => {
	console.log(`Server Running at Port 3000`)
})