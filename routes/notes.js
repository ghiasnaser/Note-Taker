const note=require('express').Router();
const fs=require('fs');
const path=require('path');

// api/notes get request
note.get('/',(req,res)=>{
    // open the db.jason for read
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            // return 500 error in case of error
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const notes = JSON.parse(data);
        res.json(notes);
    })
});

// api/notes post request
note.post('/', (req, res) => {
    // the new notes content that we will add to the db.json file
    const newNote = req.body;
    // open file db.json for read
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        // return 500 error in case of error
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // array to hold the content of the db.json file
      const notes = JSON.parse(data);
      // ID for the new note we will add 
      newNote.id = notes.length + 1;
      // add the new note to the old notes
      notes.push(newNote);
      // open the file db.json for writing
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          // return 500 error in case of error
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        return res.json(newNote);
      });
    });
  });
  
  // api/notes delete rquest
  note.delete('/:id', (req, res) => {
    // get the id of the note that we will delete
    const noteID = parseInt(req.params.id);
    // open the db.json for reading
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        // return 500 error in case of error
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // array to hold the content of the db.json file
      let notes = JSON.parse(data);
      // remove the note that has the same id of the note we request to remove
      notes = notes.filter((note) => note.id !== noteID);
      // open the db.json for writing and wite the content of notes array after we removed the note we request to delete
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