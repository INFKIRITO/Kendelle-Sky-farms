const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);

function createSessionStore() {
  const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'online-shop',
    collection: 'sessions'
  });

  // Handle errors in the store initialization
  store.on('error', function (error) {
    console.log('Session store error:', error);
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    }
  };
}

module.exports = createSessionConfig;
