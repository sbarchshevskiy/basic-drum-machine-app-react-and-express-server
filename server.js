const express = require('express');
const socketio = require('socket.io');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);
const cors = require('cors');

app.use(cors());

// chat client
// io.on('connection', socket => {
//   socket.on('message', ({name, message}) => {
//     console.log("name/message",name, message);
//     io.emit('message', {name, message});
//   });
// });
// test socket for drum machine
io.on('connection', socket => {
  console.log('drum socket id',socket.id);
  socket.on('drumNoteClick', ({trackID, stepID}) => {
    console.log('drumNoteClick',trackID, stepID);
    io.emit('drumNoteClick', {trackID, stepID})
  })
})
// alternative socket
// io.sockets.on('connection', newListener)
// function newListener(socket) {
//   console.log('connected', socket.id)
//
//   socket.on('onNoteClick', onNoteClick);
//   function onNoteClick(data) {
//     console.log(data)
//   }
// }

app.get('/', (req, res) => {
  res.send('ok');
});


const bodyParser = require("body-parser");
const { Pool } = require("pg");
require("dotenv").config();


const jsonParser = bodyParser.json();
app.use(jsonParser);

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    api: process.env.DB_GMAPS,
  };
}

const db = new Pool(dbParams);
db.connect();

app.get("/api/creators", (req, res) => {
  const creators = [
    { id: 1, firstName: "Nick", lastName: "Maniutin" },
    { id: 2, firstName: "Bobby", lastName: "Brown" },
    { id: 3, firstName: "Sergey", lastName: "Barchshevskiy" },
  ];

  res.json(creators);
});



//send drum values to the db
app.post("/session/drums", (req, res) => {
  const data = req.body.drumValues;
  res.json({});
  const queryParams = [
    "1",
    data.drums_kick,
    data.drums_snare,
    data.drums_ho,
    data.drums_hc,
  ];
  const queryString = `INSERT INTO drum_sequence (session_id, drums_kick, drums_snare, drums_ho, drums_hc) 
  VALUES ($1, $2, $3, $4, $5);`;
  db.query(queryString, queryParams)
    .then((res) => console.log("DONE!", res.rows))
    .catch((err) => console.log("ERRRRROR!", err));
});

//send bass values to the db
app.post("/session/bass", (req, res) => {
  const data = req.body.bassValues;
  res.json({});
  const queryParams = [
    "1",
    data.bass_c2,
    data.bass_b1,
    data.bass_a1,
    data.bass_g1,
    data.bass_f1,
    data.bass_e1,
    data.bass_d1,
    data.bass_c1,
  ];
  const queryString = `INSERT INTO bass_sequence (session_id, bass_c1, bass_d1, bass_e1, bass_f1, bass_g1, bass_a1, bass_b1, bass_c2) 
  VALUES ($1, $9, $8, $7, $6, $5, $4, $3, $2);`;
  db.query(queryString, queryParams)
    .then((res) => console.log("DONE!", res.rows))
    .catch((err) => console.log("ERRRRROR!", err));
});

//send synth values to the db
app.post("/session/synth", (req, res) => {
  const data = req.body.synthValues;
  res.json({});
  const queryParams = [
    "1",
    data.synth_c4,
    data.synth_b3,
    data.synth_a3,
    data.synth_g3,
    data.synth_f3,
    data.synth_e3,
    data.synth_d3,
    data.synth_c3,
  ];
  const queryString = `INSERT INTO synth_sequence (session_id, synth_c3, synth_d3, synth_e3, synth_f3, synth_g3, synth_a3, synth_b3, synth_c4) 
  VALUES ($1, $9, $8, $7, $6, $5, $4, $3, $2);`;
  db.query(queryString, queryParams)
    .then((res) => console.log("DONE!", res.rows))
    .catch((err) => console.log("ERRRRROR!", err));
});


const port = 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));