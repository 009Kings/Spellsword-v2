require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(helmet());

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30 // 30 minutes
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(function(req, res, next) {
  console.log(req)
  next()
});

app.get('/', function(req, res) {
  // res.json({ message: 'Eat my shorts' });
  console.log("eat farts fuckface")
  res.send("fuck you")
})

app.get('/profile', isLoggedIn, function(req, res) {
  res.json(req.user);
})

// Controllers go here
app.use('/', require('./routes/auth'));

let server = app.listen(process.env.PORT || 3001, () => console.log(`🎧 You're listening to the smooth sounds of Port ${process.env.PORT || 3001} 🎧`));

module.exports = server;