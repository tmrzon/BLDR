// const http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('<h1>Welcome to Leader Sites</h1>');
// }).listen(3000);
const express = require("express");

const server = express();

var cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const port = 3000;
const builderRegisterRouter = require("./routes/register.js");
const builderApiRouter = require("./routes/api.js");
const apiForPublishRouter = require("./routes/apiForPublish.js");
const builderViewsRouter = require("./routes/view.js");
const bodyParser = require("body-parser");
const request = require("request");
const cookieParser = require("cookie-parser");
const requestIp = require("request-ip");
// const fileupload = require('express-fileupload');
// server.use(fileupload({ createParentPath: true }))
const { checkPermission, createUser } = require("./controller/auth");
// const http1 = require('http').createServer(server);
//const io = require('socket.io')(http);
let socketHold = require('./controller/socket')

//soket
// const socketIo = require("socket.io");
// const io = socketIo(http1);



server.use(express.json({ limit: "50mb" }));
server.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
server.use(cors());
// server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.text());
server.use(cookieParser());


// server.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: true,
//     parameterLimit: 50000
//   })
// );
// server.use(ipMiddleware);
// inside middleware handler
// function ipMiddleware(req, res, next) {
//   const clientIp = requestIp.getClientIp(req);
//   console.log("clientip: " + clientIp);
//   next();
// }


//app.use('/api', apiHandler)


server.all("/*", function (req, res, next) {
  console.log('URL TEST >> ', req.subdomains)
  console.log(req.originalUrl)
  next();
})

server.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
server.use(express.static(path.join(__dirname, '/dist/leaderSites')));


function print(req, res, next) {
  console.log('before routing');
  console.log(req.originalUrl);
  return next();
}

//server.use(print);

server.use("/register",
  builderRegisterRouter)
server.use("/apiForPublish", function (req, res, next) {
  console.log('apiforpublish');
  return next();
}, print, apiForPublishRouter);

server.use("/api", function (req, res, next) {
  console.log('api');
  return next();
}, print, builderApiRouter);
server.use('/:userName/isPermission', function (req, res, next) {
  console.log('ispermission');
  return next();
}, print, checkPermission, createUser, (req, res) => { res.status(200).send() });

server.use("/", function (req, res, next) {
  console.log('slash');
  return next();
},
  // express.static(path.join(__dirname, '/dist/leaderSites')),
  builderViewsRouter);

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("connected!");
});

//soket
// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");

//   });
// });

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };
let http = server.listen(port, () => {
  console.log(`Server running at http://${port}/`);
});

let io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log("Client Connected");
  socketHold = socket;
})
