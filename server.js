const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const jsonParser = bodyParser.json();
const app = express();
app.use(cors());
app.use(jsonParser);

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
  console.log("REQBODY: ", req.body);
  res.json({});
});

app.listen(port, () => `Server running on port ${port}`);
