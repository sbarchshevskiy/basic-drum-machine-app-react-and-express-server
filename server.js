const express = require("express");

const cors = require("cors");

const app = express();
app.use(cors());

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
});

app.listen(port, () => `Server running on port ${port}`);
