const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
require("dotenv").config();

const cors = require("cors");

const jsonParser = bodyParser.json();
const app = express();
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

const port = 5000;

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
  VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
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
  VALUES ($1, $9, $8, $7, $6, $5, $4, $3, $2) RETURNING *;`;
  db.query(queryString, queryParams)
    .then((res) => console.log("DONE!", res.rows))
    .catch((err) => console.log("ERRRRROR!", err));
});

//send synth values to the db
app.post("/session/synth", (req, res) => {
  const data = req.body.synthValues;
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
  VALUES ($1, $9, $8, $7, $6, $5, $4, $3, $2) RETURNING *;`;
  db.query(queryString, queryParams)
    .then((result) => res.json(result.rows[0]))
    .catch((err) => console.log("ERRRRROR!", err));
});

app.post("/tracks/new", (req, res) => {
  const data = req.body.createNewTrack;
  const queryParams = ["1", data.title, data.category, data.description];
  const queryString = `INSERT INTO tracks (user_id, title, category, description)
  VALUES ($1, $2, $3, $4) RETURNING *;`;
  db.query(queryString, queryParams)
    .then((result) => res.json(result.rows[0]))
    .catch((err) => console.log("ERRRRROR!", err));
});

app.post("/sessions/new", (req, res) => {
  const data = req.body.trackID;
  const queryParams = ["1", data];
  const queryString = `INSERT INTO sessions (user_id, track_id) VALUES ($1, $2) RETURNING *;
  `;
  db.query(queryString, queryParams)
    .then((result) => res.json(result.rows[0]))
    .catch((err) => console.log("ERRRRROR!", err));
});

app.listen(port, () => `Server running on port ${port}`);
