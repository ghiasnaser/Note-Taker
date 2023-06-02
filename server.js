const express=require('express');
const path=require('path');
const fs=require('fs');
const api=require('./routes/index');
const PORT=process.env.PORT || 3001;
const app=express();

//Middleware to allow the application to parse JSON data from the HTTP request body
app.use(express.json());
//Middleware to enable the parsing of URL-encoded data in the HTTP request body
app.use(express.urlencoded({extended: true}));
//Middleware to enable serving static files from a directory "public"
app.use(express.static('public'));
app.use('/api', api);


//Get Route for the home page
app.get('/',(req,res)=>
    res.sendFile(path.join(__dirname,'/public/pages/index.html'))
);

//get Routw for the notes page
app.get('/notes',(req,res)=>
    res.sendFile(path.join(__dirname,'/public/pages/notes.html'))
);

app.listen(PORT,()=>
    console.log(`App listening at http://localhost:${PORT}`)
);