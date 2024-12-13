const express = require('express');
const app = express();
const port = 4000;

// Enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
app.use(cors());

// Set CORS headers for all incoming requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middleware to parse URL-encoded and JSON request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.lledy.mongodb.net/ProjDB');

// Define and create the schema for the Todo model
const todoSchema = new mongoose.Schema({
    task: String, 
    completed: Boolean,
});
const TodoModel = mongoose.model('Todo', todoSchema);

// Define and create the schema for the Note model
const noteSchema = new mongoose.Schema({
    title: String,       
    dateCreated: Date,
    dateEdited: Date,
    noteBody: String      
});
const NoteModel = mongoose.model('Note', noteSchema);

// Define and create the schema for the GradeCalc model
const gradeCalcSchema = new mongoose.Schema({
    module: String,
    title : String,
    grade: Number,
    weighting: Number,
    result: Number
});

const GradeCalcModel = mongoose.model('GradeCalc', gradeCalcSchema);

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
    const newTodo = new TodoModel({ task, completed: completed || false });
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

// Fetch all grade calculation entries
app.get('/api/gradecalcs', async (req, res) => {
    const gradecalcs = await GradeCalcModel.find({});
    res.json({ gradecalcs });
});

// Fetch a single grade entry by ID
app.get('/api/gradecalcs/:id', async (req, res) => {
    const gradecalcs = await GradeCalcModel.findById(req.params.id);
    res.json(gradecalcs);
});

// Create a new grade calculation entry
app.post('/api/gradecalcs', async (req, res) => {
    const { module, title, grade, weighting, result } = req.body;

    const newGradeCalc = new GradeCalcModel({ module, title, grade, weighting, result });

    // Save the new grade calculation entry to the database
    await newGradeCalc.save();

    // Respond with a success message and the created entry
    res.status(201).json({ message: 'Grade Calculation created successfully', gradecalc: newGradeCalc });
});

// Update an existing grade calculation entry
app.put('/api/gradecalcs/:id', async (req, res) => {
    const { module, title, grade, weighting, result } = req.body;

    const updatedGradeCalc = await GradeCalcModel.findByIdAndUpdate(req.params.id, { module, title, grade, weighting, result }, { new: true });
    res.json({ message: 'Grade Calculation updated successfully', gradecalc: updatedGradeCalc });
});

// Delete a grade calculation entry
app.delete('/api/gradecalcs/:id', async (req, res) => {
    await GradeCalcModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Grade Calculation entry deleted successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});