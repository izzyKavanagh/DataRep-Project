const express = require('express');

const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.lledy.mongodb.net/ProjDB');
const moduleSchema = new mongoose.Schema({
    title: String,
    exam1: Number, 
    exam2: Number
});
 
const moduleModel = new mongoose.model('Module', moduleSchema);

const timetableSchema = new mongoose.Schema({
  subject: String,
  date: String,
  startTime: String,
  endTime: String,
});

const TimetableModel = mongoose.model('Timetable', timetableSchema);

app.get('/api/modules', async(req, res) => {
    const modules = await moduleModel.find({});
    res.json({modules});
});

app.get('/api/modules/:id', async (req, res) => {
    // Fetch a module by its ID from the database
    const module = await moduleModel.findById(req.params.id);
    console.log(module);
    res.send(module); // Send the movie details as a response
});

app.post('/api/modules', async(req,res)=>{
    console.log(req.body) // Log the title from the request body to the console

    // Extract movie details from the request body
    const { title,exam1,exam2 } = req.body;

    // Create a new movie document using the extracted details
    const newModule = new moduleModel({ title,exam1,exam2 });
    // Save the new movie to the database
    await newModule.save();

    // Respond with a success message and the created movie
    res.status(201).json({ message: 'Module created successfully', module: newModule }); // Send a confirmation response to the client
})

app.get('/api/timetables', async(req, res) => {
    const timetables = await TimetableModel.find({});
    res.json({timetables});
});

app.get('/api/timetables/:id', async (req, res) => {
    // Fetch a module by its ID from the database
    const timetable = await TimetableModel.findById(req.params.id);
    console.log(timetable);
    res.send(timetable); // Send the movie details as a response
});

app.post('/api/timetables', async(req,res)=>{
    console.log(req.body) // Log the title from the request body to the console

    // Extract movie details from the request body
    const { subject, startTime, endTime } = req.body;

    // Create a new movie document using the extracted details
    const newTimetable = new TimetableModel({ subject, startTime, endTime });
    // Save the new movie to the database
    await newTimetable.save();

    // Respond with a success message and the created movie
    res.status(201).json({ message: 'Timetable created successfully', timetable: newTimetable }); // Send a confirmation response to the client
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});