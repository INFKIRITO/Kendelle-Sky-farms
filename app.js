const express = require('express');
const path = require('path');
const db = require('./data/database');
const authRoutes = require('./routes/auth.routes');
const checkAuthStatusMiddleware = require('./middleware/check-auth');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const productsRoutes = require('./routes/products.routes');
const app = express();
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const addCsrfTokenMiddleware = require('./middleware/csrf-token');
const errorHandleMiddleware = require('./middleware/error-handler');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// Correct the variable name to createSessionConfig
const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);
// app.use(errorHandleMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/admin', adminRoutes);

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
