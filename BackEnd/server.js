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


app.get('/api/modules', (req, res) => {
    const modules = [
        {
          "Title": "Module Title",
          "mID": "module ID"
        }
      ];
    res.status(200).json({modules})
});

app.post('/api/modules',(req, res)=>{
    console.log(req.body.title);
    res.send("Module info Added!");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});