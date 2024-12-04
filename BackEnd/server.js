const express = require('express');

const app = express();

const port = 4000;

app.get('/api/movies', (req, res) => {
    const modules = [
        {
          "Title": "Module Title",
          "mID": "module ID"
        }
      ];
    res.status(200).json({modules})
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});