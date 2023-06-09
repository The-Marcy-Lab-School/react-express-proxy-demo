const express = require('express');
const path = require('path');

const app = express();

// middleware
app.use(express.json());

// static requests to http://localhost:3000 
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// routes (non static requests to any other path)
app.get('*', (req, res, next) => {
  // if the request is not an /api request, send them the index.html
  // and let the frontend handle the routing
  if (!req.originalUrl.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
  // otherwise send the request along to the handlers below
  else {
    next();
  }
});

// api endpoints
app.get('/api/hello', (req, res) => {
  res.send({ msg: "hello world!!!" });
})
app.get('/api/luis', (req, res) => {
  res.send({ msg: "hello luis!!!" });
})
app.get('/api/ben', (req, res) => {
  res.send({ msg: "hello ben!!!" });
})

module.exports = app;
