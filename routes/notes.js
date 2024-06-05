const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile, } = require('../helpers/fsUtils');
const fs= require('fs');

notes.get('/', (req, res)=> {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', async (req,res) => {

    const { title, text} = req.body
    if (req.body) {
        const newNote = {
            title,
            text
        };

        // const addNote = await readAndAppend(newNote, './db/db.json');


        readFromFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
            } else {
              const parsedData = JSON.parse(data);
              parsedData.push(newNote);
              fs.writeFile('./db/db.json', JSON.stringify(parsedData),  () =>  {
                res.json('written')
              });
            }
          })

        
    } else{
        res.error('Error in adding note')
    }
})




module.exports = notes;