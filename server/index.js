const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const volleyball = require('volleyball');
const cors = require(`cors`);

// ======>>>>>>>>>>>> Middlewares

app.use(volleyball);
app.use(
  cors({
    origin: 'http://localhost:8080',
  }),
);
app.use(express.json());

// ======>>>>>>>>>>>>> Routes

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.post('/login', (req, res) => {
  io.emit('msgParaCliente', {
    user: req.body.user,
    message: ' acabou de entrar no chat.',
    date: Date.now(),
  });
  res.json({
    message: 'ok',
  });
});

// ======>>>>>>>>>>>> Server

const port = process.env.PORT || 5990;
server.listen(port, () => {
  console.log(`Listening on port`, port);
});

// ======>>>>>>>>>>>>> Socket.io

io.on('connection', socket => {
  console.log('Usuário ', socket.id, ' conectado.');
  socket.on('SEND_MESSAGE', data => {

    data.date = Date.now();

    io.emit('MESSAGE', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuário ', socket.idm, ' desconectado.');
  });
});
