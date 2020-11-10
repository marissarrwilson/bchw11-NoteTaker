const fs = require('fs');
const path = require('path');

module.exports = app => {
     data = fs.readFileSync("db/db.json", "utf8")

     var notes = JSON.parse(data);

     app.get("/api/notes", function (req, res) {
          res.json(notes);
     });
     app.post("/api/notes", function (req, res) {
          // Receives a new note, adds it to db.json, then returns the new note
          let newNote = req.body;
          newNote.id = Date.now(); //giving this note a unique-id.
          notes.push(newNote);
          updateDb();
          return console.log("Added new note: " + newNote.title);
     });
     app.get("/api/notes/:id", function (req, res) {
          res.json(notes[req.params.id]);
     });
     app.delete("/api/notes/:id", function (req, res) {
          //notes.splice(req.params.id, 1);
          // filter out the one note that has the delete id (ie keep all the rest)
          notes = notes.filter( note=>note.id != req.params.id )
          console.log("Deleted note with id " + req.params.id, notes);
          updateDb();
     });
     app.get('/notes', function (req, res) {
          res.sendFile(path.join(__dirname, "../public/notes.html"));
     });
     // app.get('*', function (req, res) {
     //      res.sendFile(path.join(__dirname, "../public/index.html"));
     // });

     function updateDb() {
          fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
               if (err) throw err;
               return true;
          });
     }
}