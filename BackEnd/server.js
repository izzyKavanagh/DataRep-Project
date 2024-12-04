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
mongoose.connect('mongodb+srv://admin:admin@cluster0.lledy.mongodb.net/ProjectDB');
const moduleSchema = new mongoose.Schema({
    title: String
});
 
const moduleModel = new mongoose.model('Module', moduleSchema);

app.get('/api/modules', async(req, res) => {
    const module = await moduleModel.find({});
    res.json({module});
});

app.get('/api/modules/:id', async (req, res) => {
    // Fetch a module by its ID from the database
    const module = await moduleModel.findById(req.params.id);
    console.log(module);
    res.send(module); // Send the movie details as a response
  });

  app.post('/api/modules', async(req,res)=>{
    console.log(req.body.title) // Log the title from the request body to the console

    // Extract movie details from the request body
    const {title} = req.body;

    // Create a new movie document using the extracted details
    const newModule = new moduleModel({ title});
    // Save the new movie to the database
    await newModule.save();

    // Respond with a success message and the created movie
    res.status(201).json({ message: 'Module created successfully', module: newModule }); // Send a confirmation response to the client
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});