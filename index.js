const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const { sequelize } = require('./models/setup');
require('dotenv').config();
require('./config/passport')(passport);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my blog!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

sequelize.sync();
