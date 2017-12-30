const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+ config.database);
});
// On Database Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+ err);
});

// Init Express App
const app = express();

// Link to User Schema
const users = require('./routes/users');

// Port Number
const port = 3000;

// Cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Users Schema
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});
// Start Server
app.listen(port, () => {
  console.log("Server has started on " +port);
});
