const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/mongoose');
const cors = require('cors');
// define schema for data model
const Schema = mongoose.Schema;
const myDataSchema = new Schema({
    name: String,
    email: String
});

// define data model based on schema
const MyData = mongoose.model('MyData', myDataSchema);

// create new instance of express application
const app = express();
const corsOptions ={
    origin:'http://localhost:7000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors());
app.use(bodyParser.json());

// use body-parser middleware to parse request body as JSON

// define routes
app.get('/api/data', async (req, res) => {
    try {
        const data = await MyData.find({});
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/data/:id', async (req, res) => {
    try {
        const data = await MyData.findById(req.params.id);
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/data', async (req, res) => {
    try {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        const newData = new MyData(req.body);
        const data = await newData.save();
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/api/data/:id', async (req, res) => {
    try {
        const data = await MyData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/api/data/:id', async (req, res) => {
    try {
        const data = await MyData.findByIdAndRemove(req.params.id);
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send('This has CORS enabled 🎈')
})


// start server
app.listen(7000, () => console.log('Server started on port 7000'))