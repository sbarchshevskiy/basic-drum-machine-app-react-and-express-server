const express = require('express');
const socketio = require('socket.io');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);
const cors = require('cors');

app.use(cors());

io.on('connection', socket => {
  console.log('socket id',socket.id);
  socket.on('message', ({name, message}) => {
    console.log("name/message",name, message);
    io.emit('message', {name, message});
  });
});



app.get('/', (req, res) => {
  res.send('ok');
});


app.get('/api/creators', (req, res) => {
  const creators = [
    {id: 1, firstName: 'Nick'},
    {id: 2, firstName: 'Bobby'},
    {id: 3, firstName: 'Sergey'},
  ];

  res.json(creators);
});

const port = 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));