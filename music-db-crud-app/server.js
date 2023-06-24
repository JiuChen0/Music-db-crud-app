//Jiu Chen
//6/8/2023

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());



mongoose.connect('mongodb+srv://chenjiu:<pwd>@cluster0.fksoems.mongodb.net/music_db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database');
});

// Define the schema for a song
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  year: Number,
  genre: String 
});


const Song = mongoose.model('Song', songSchema);

// POST route to create a new song
app.post('/songs', (req, res) => {
  const newSong = new Song(req.body);
  newSong.save()
    .then(song => {
      res.status(200).send(song);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Get route to get all songs
app.get('/songs', (req, res) => {
  Song.find()
  .then(songs => {
      res.json(songs);
  })
  .catch(err => {
      res.status(500).send(err);
  });
});


// Get route to get all genres
app.get('/genres', async (req, res) => {
  try {
      const genres = await Song.distinct('genre');
      res.json(genres);
  } catch (err) {
      res.status(500).send(err);
  }
});

// Get route to get songs of a specific genre
app.get('/songs/genre/:genre', async (req, res) => {
  const genre = req.params.genre;

  try {
      const songs = await Song.find({ genre: genre });
      res.json(songs);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


// Put route to update a specific song
app.put('/songs/:id', async (req, res) => {  
  const id = req.params.id;
  const updatedSong = req.body;
  updatedSong.year = parseInt(updatedSong.year, 10);  

  try {
    const song = await Song.findByIdAndUpdate(id, updatedSong, { new: true });  
    res.json(song)
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete route to delete a specific song
app.delete('/songs/:id', (req, res) => {
  const id = req.params.id;
  
  Song.findByIdAndDelete(id)
    .then(result => res.json({ message: "Song deleted", result }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get route to send the genre HTML file
app.get('/genre', (req, res) => {
  res.sendFile(path.join(__dirname, 'genre.html'));
});
