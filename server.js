const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: "http://localhost:3000",
  methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
  credentials: true}})
const cors = require('cors');


io.on('connection', socket => {
  console.log('socket id',socket.id)
  socket.on('message', ({name, message}) => {
    console.log("name/message",name, message )
    io.emit('message', {name, message})
  })
})


app.get('/api/creators', cors(), (req, res) => {
  const creators = [
    {id: 1, firstName: 'Nick'},
    {id: 2, firstName: 'Bobby'},
    {id: 3, firstName: 'Sergey'},
  ];

  res.json(creators);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);