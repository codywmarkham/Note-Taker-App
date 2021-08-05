const express = require("express");
const router = express.Router()
const fs = require("fs");
const path = require('path');
const notesData = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('/api/notes', (req, res) => {
    res.json(notesData);
    });

app.post("/api/notes", (req, res) => {
  
  notesData.push(req.body);
  notesData.forEach((obj, i) => {
    obj.id = i + 1;
  });
  
  fs.writeFile("./db/db.json", JSON.stringify(notesData), () => {
    res.json(notesData);
  });
});
//Bonus Points +10 plz
app.delete("/api/notes/:id",  (req, res) => {
  var id = req.params.id;
  notesData.splice(id - 1, 1);
  notesData.forEach((obj, i) => {
    obj.id = i + 1;
  });
  fs.writeFile("./db/db.json", JSON.stringify(notesData), () => {
    res.json(notesData);
  });
});

app.get('*', (req,res) => 
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);