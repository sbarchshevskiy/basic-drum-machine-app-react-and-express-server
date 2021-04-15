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

app.post("/session", (req, res) => {
  const data = req.body.trackValues;
  console.log("REQBODY: ", data);
  res.json({});
  const queryParams = [
    "1",
    data.drums_kick,
    data.drums_snare,
    data.drums_hc,
    data.drums_ho,
  ];
  const queryString = `INSERT INTO drum_sequence (session_id, drums_kick, drums_snare, drums_hc, drums_ho) 
  VALUES (1, ARRAY[1, 5, 9, 13], ARRAY[5, 13], ARRAY[1, 3, 5, 7, 9, 11, 13, 15], ARRAY[15]);`;
  db.query(queryString, queryParams)
    .then((res) => console.log("DONE!", res.rows))
    .catch((err) => console.log("ERRRRROR!", err));
});

app.listen(port, () => `Server running on port ${port}`);
