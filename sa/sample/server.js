var express=require("express");
var session=require("express-session");
var cookieParser = require('cookie-parser');
var cors=require('cors');
var bodyParser=require("body-parser");
const Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var router=require("./router")(express);
var passport=require("passport");
var app=express();
var server = require('http').createServer(app);
var io = require('socket.io')();
var middle=require("./middlewars/passport")(app);
var expressValidator = require('express-validator');
var config=require('./config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(cors());
var user=require('./models/index');
  app.use(session({
    secret: config.SECRET,
    store: new SequelizeStore({
      db: user.sequelize
    }),
  saveUninitialized: true,
  cookie: { secure: true }
  }));
 
app.use("/",router);
user.sequelize.sync({force:false});
server.listen(config.PORT,function() {
    console.log(`connected ${config.PORT}`);
})
