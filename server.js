const express = require('express');
const cors = require('cors');

const app = express();

app.get('/api/creators', cors(), (req, res) => {
  const creators = [
    {id: 1, firstName: 'Nick', lastName: 'Maniutin'},
    {id: 2, firstName: 'Bobby', lastName: 'Brown'},
    {id: 3, firstName: 'Sergey', lastName: 'Barchshevskiy'},
  ];

  res.json(creators);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);