const express = require("express");
const socketio = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

io.on("connection", (socket) => {
  console.log("socket id", socket.id);
  socket.on("message", ({ name, message }) => {
    console.log("name/message", name, message);
    io.emit("message", { name, message });
  });
});

app.get("/", (req, res) => {
  res.send("ok");
});

const { Pool } = require("pg");
require("dotenv").config();

const jsonParser = bodyParser.json();
app.use(cors());
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
  };
}

const db = new Pool(dbParams);
// db.connect();

app.get("/users", (req, res) => {
  const queryString = `SELECT * FROM users;
  `;

  db.query(queryString)
    .then((result) => res.json(result.rows))
    .catch((err) => console.log("ERRRRROR!", err));
});

app.get("/sessions", (req, res) => {
  const queryString = `SELECT * FROM sessions;
  `;

  db.query(queryString)
    .then((result) => res.json(result.rows))
    .catch((err) => console.log("ERRRRROR!", err));
});

app.get("/api/creators", (req, res) => {
  const creators = [
    { id: 1, firstName: "Nick", lastName: "Maniutin" },
    { id: 2, firstName: "Bobby", lastName: "Brown" },
    { id: 3, firstName: "Sergey", lastName: "Barchshevskiy" },
  ];

  res.json(creators);
});

const port = 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));

//get session id from the db
app.get("/tracks/:trackID", (req, res) => {
  const queryString = `SELECT * FROM sessions WHERE track_id = ${req.params.trackID}
 ;
  `;
  db.query(queryString)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => console.log("ERRRRROR!", err));
});

app.get("/sessions/:sessionID", (req, res) => {
  const queryString = `SELECT * 
  FROM drum_sequence, bass_sequence, synth_sequence
  WHERE drum_sequence.session_id = ${req.params.sessionID} 
  AND bass_sequence.session_id = ${req.params.sessionID} 
  AND synth_sequence.session_id = ${req.params.sessionID};
  `;

  db.query(queryString)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => console.log("ERRRRROR!", err));
});
//send drum values to the db
app.post("/session/drums", (req, res) => {
  const data = req.body.newSessionID;
  // res.json({});
  const queryParams = [data];
  const queryString = `INSERT INTO drum_sequence 
  (session_id, drums_kick, drums_snare, drums_ho, drums_hc) 
  VALUES ($1, 
  ARRAY[]::integer[], 
  ARRAY[]::integer[], 
  ARRAY[]::integer[], 
  ARRAY[]::integer[]) RETURNING *;`;
  db.query(queryString, queryParams)
    .then((result) => {
      res.json(result.rows[0]);
    })
    .catch((err) => console.log("ERRRRROR!", err));
});

//update drum values in the db
app.post("/session/:sessionID/drums", (req, res) => {
  const data = req.body.drumValues;
  res.json({});
  const queryParams = [
    req.params.sessionID,
    data.drums_kick,
    data.drums_snare,
    data.drums_ho,
    data.drums_hc,
  ];
  const queryString = `UPDATE drum_sequence
        SET drums_kick = $2,
        drums_snare = $3,
        drums_ho = $4,
        drums_hc = $5
        WHERE drum_sequence.session_id = $1 RETURNING *;`;
  db.query(queryString, queryParams)
    .then((res) => console.log("DONE!", res.rows))
    .catch((err) => console.log("ERRRRROR!", err));
});

// send bass values to the db
app.post("/session/bass", (req, res) => {
  const data = req.body.newSessionID;
  // res.json({});
  const queryParams = [data];
  const queryString = `INSERT INTO bass_sequence
  (session_id, bass_c1, bass_d1, bass_e1, bass_f1, bass_g1, bass_a1, bass_b1, bass_c2)
  VALUES ($1,
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[]) RETURNING *;`;
  db.query(queryString, queryParams)
    .then((result) => {
      res.json(result.rows[0]);
    })
    .catch((err) => console.log("ERRRRROR!", err));
});

//update bass values in the db
app.post("/session/:sessionID/bass", (req, res) => {
  const data = req.body.bassValues;
  res.json({});
  const queryParams = [
    req.params.sessionID,
    data.bass_c2,
    data.bass_b1,
    data.bass_a1,
    data.bass_g1,
    data.bass_f1,
    data.bass_e1,
    data.bass_d1,
    data.bass_c1,
  ];
  const queryString = `UPDATE bass_sequence
  SET bass_c1 = $9,
  bass_d1 = $8,
  bass_e1 = $7,
  bass_f1 = $6,
  bass_g1 = $5,
  bass_a1 = $4,
  bass_b1 = $3,
  bass_c2 = $2
  WHERE bass_sequence.session_id = $1 RETURNING *;`;
  db.query(queryString, queryParams)
    .then((res) => console.log("DONE!", res.rows))
    .catch((err) => console.log("ERRRRROR!", err));
});

//send synth values to the db
app.post("/session/synth", (req, res) => {
  const data = req.body.newSessionID;
  const queryParams = [data];
  const queryString = `INSERT INTO synth_sequence
  (session_id, synth_c3, synth_d3, synth_e3, synth_f3, synth_g3, synth_a3, synth_b3, synth_c4)
  VALUES ($1,
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[],
  ARRAY[]::integer[]) RETURNING *;`;
  db.query(queryString, queryParams)
    .then((result) => {
      res.json(result.rows[0]);
    })
    .catch((err) => console.log("ERRRRROR!", err));
});

//update synth values in the db
app.post("/session/:sessionID/synth", (req, res) => {
  const data = req.body.synthValues;
  res.json({});
  const queryParams = [
    req.params.sessionID,
    data.synth_c4,
    data.synth_b3,
    data.synth_a3,
    data.synth_g3,
    data.synth_f3,
    data.synth_e3,
    data.synth_d3,
    data.synth_c3,
  ];
  const queryString = `UPDATE synth_sequence
  SET synth_c3 = $9,
  synth_d3 = $8,
  synth_e3 = $7,
  synth_f3 = $6,
  synth_g3 = $5,
  synth_a3 = $4,
  synth_b3 = $3,
  synth_c4 = $2
  WHERE synth_sequence.session_id = $1 RETURNING *;`;
  db.query(queryString, queryParams)
    .then((res) => console.log("DONE!", res.rows))
    .catch((err) => console.log("ERRRRROR!", err));
});

//render track info
app.get("/tracks", (req, res) => {
  const queryString = `SELECT tracks.*, users.name FROM tracks, users
  WHERE users.id = tracks.user_id
  ;
  `;
  db.query(queryString)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => console.log("ERRRRROR!", err));
});

//create a new track
app.post("/tracks/new", (req, res) => {
  const data = req.body.createNewTrack;
  const queryParams = ["1", data.title, data.category, data.description];
  const queryString = `INSERT INTO tracks (user_id, title, category, description)
  VALUES ($1, $2, $3, $4) RETURNING *;`;
  db.query(queryString, queryParams)
    .then((result) => res.json(result.rows[0]))
    .catch((err) => console.log("ERRRRROR!", err));
});

//create a new session
app.post("/sessions/new", (req, res) => {
  const data = req.body.trackID;
  const queryParams = ["1", data];
  const queryString = `INSERT INTO sessions (user_id, track_id) VALUES ($1, $2) RETURNING *;
  `;
  db.query(queryString, queryParams)
    .then((result) => {
      res.json(result.rows[0]);
    })
    .catch((err) => console.log("ERRRRROR!", err));
});

//contribute to a session

// app.listen(port, () => `Server running on port ${port}`);
