require('dotenv').config()
const express = require('express'),
    app = express(),
    http = require('http'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    Proxy = require('http-proxy').createProxyServer(),
    routes = require('./routes/routes.js');

port = process.env.API_PORT
const ProxyServer= 'http://localhost:'+ process.env.PROXY_PORT;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, );
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(routes);
const server = http.createServer(app);
server.listen(port, () => {
    console.log("API running on port", port);
});

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
      success: false,
      message: err.message || "An error occurred",
      errors: err.error || [],
    });
  });
  
  app.use((req, res) => {
    res.status(404).json({ success: false, message: "Resource not found." });
  });
  
// const io = require('socket.io')(process.env.SOCKET_PORT, {
//     handlePreflightRequest: (req, res) => {
//         const headers = {
//             "Access-Control-Allow-Headers": "Content-Type, Authorization",
//             "Access-Control-Allow-Origin": req.headers.origin,
//             "Access-Control-Allow-Credentials": true,
//         };
//         res.writeHead(200, headers);
//         res.end();
//     },
//     path: '/',
//     serveClient: true,
//     origins: '*:*',
//     cookie: true,
//     pingInterval: 1000,
//     pingTimeout: 100,
//     upgradeTimeout: 1000,
//     allowUpgrades: true,
// });

// io.on('connection', function(socket) {
//     socket.on('stream', function(data) {
//         socket.broadcast.emit('stream', data);
//     });
// });

// io.of('/stream'.clients((error, clients) => {
//     if (error) throw error;
//     console.log(clients);
// }))

// app.all("/*", function (req, res) {
//     Proxy.web(req, res, {target: ProxyServer})
// })



module.exports = server;