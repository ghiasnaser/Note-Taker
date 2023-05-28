const note=require('express').Router();
const fs=require('fs');
const path=require('path');

note.get('/',(req,res)=>{
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const notes = JSON.parse(data);
        res.json(notes);
    })
});

note.post('/', (req, res) => {
    const newNote = req.body;
  
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      const notes = JSON.parse(data);
      newNote.id = notes.length + 1;
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        return res.json(newNote);
      });
    });
  });
  
  note.delete('/:id', (req, res) => {
    const noteID = parseInt(req.params.id);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      let notes = JSON.parse(data);
      notes = notes.filter((note) => note.id !== noteID);
  
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        return res.json({ success: true });
      });
    });
  });
  

module.exports=note;