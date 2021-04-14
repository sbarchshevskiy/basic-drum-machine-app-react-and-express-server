const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  socket.on('message', ({name, message}) => {
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