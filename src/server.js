import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import socketio from 'socket.io';
import http from 'http';
import 'dotenv/config';

import routes from './routes';

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

// eslint-disable-next-line no-console
server.listen(3030, () => console.log('Application started at port 3030 ...'));
