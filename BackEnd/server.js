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
  startTime: String,
  endTime: String
});

const TimetableModel = mongoose.model('Timetable', timetableSchema);

const todoSchema = new mongoose.Schema({
    task: String,       // The description of the to-do task
    completed: Boolean, // Boolean to track if the task is completed
});

const TodoModel = mongoose.model('Todo', todoSchema);

const noteSchema = new mongoose.Schema({
    title: String,       
    dateCreated: Date,
    dateEdited: Date,
    noteBody: String      
});

const NoteModel = mongoose.model('Note', noteSchema);

const gradeCalcSchema = new mongoose.Schema({
    grade: {
        type: Number,  // Store grade as a number (e.g., 85 for 85%)
        required: true
    },
    weighting: {
        type: Number,  // Store weighting as a number (e.g., 0.3 for 30%)
        required: true
    }
});

const GradeCalcModel = mongoose.model('GradeCalc', gradeCalcSchema);

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

// Fetch all to-do items
app.get('/api/todos', async (req, res) => {
    const todos = await TodoModel.find({});
    res.json({ todos });
});

// Fetch a single to-do item by ID
app.get('/api/todos/:id', async (req, res) => {
    const todo = await TodoModel.findById(req.params.id);
    res.json(todo);
});

// Create a new to-do item
app.post('/api/todos', async (req, res) => {
    const { task, completed } = req.body;
    const newTodo = new TodoModel({ task, completed: completed || false }); // Default completed to false
    await newTodo.save();
    res.status(201).json({ message: 'To-Do item created successfully', todo: newTodo });
});

// Update an existing to-do item
app.put('/api/todos/:id', async (req, res) => {
    const { task, completed } = req.body;
    const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.id, { task, completed }, { new: true });
    res.json({ message: 'To-Do item updated successfully', todo: updatedTodo });
});

// Delete a to-do item
app.delete('/api/todos/:id', async (req, res) => {
    await TodoModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'To-Do item deleted successfully' });
});

// Fetch all notes
app.get('/api/notes', async (req, res) => {
    const notes = await NoteModel.find({});
    res.json({ notes });
});

// Fetch a single note by ID
app.get('/api/notes/:id', async (req, res) => {
    const notes = await NoteModel.findById(req.params.id);
    res.json(notes);
});

// Create a new note
app.post('/api/notes', async (req, res) => {
    const { title, dateCreated, dateEdited, noteBody } = req.body;
    const newNote = new NoteModel({ title, dateCreated, dateEdited, noteBody }); 
    await newNote.save();
    res.status(201).json({ message: 'Note created successfully', note: newNote });
});

// Update an existing note
app.put('/api/notes/:id', async (req, res) => {
    const { title, dateCreated, dateEdited, noteBody } = req.body;
    const updatedNote = await NoteModel.findByIdAndUpdate(req.params.id, { title, dateCreated, dateEdited, noteBody }, { new: true });
    res.json({ message: 'Note updated successfully', note: updatedNote });
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
    await NoteModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});