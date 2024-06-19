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


app.get('/getData', (req, res) => {
	if (data !== req.query.lastData) {
		res.json({ data })
	} else {
		waitingClients.push(res);
	}
})

app.get('/updateData', (req, res) => {
	data = req.query.data;
	while (waitingClients.length > 0) {
		const res = waitingClients.pop();
		res.json({ data })
	}


	res.send({ success: 'Data Updated Successfully!!' })

})



const PORT = process.env.port || 5011;

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`)
})