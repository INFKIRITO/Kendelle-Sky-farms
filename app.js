const express = require('express');
const path = require('path');
const db = require('./data/database');
const authRoutes = require('./routes/auth.routes');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(authRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });
