/*
  dependencies:
  - express: web framework for node.js
  - method-override: allows put/delete in forms
  - ejs: templating engine
  - path: node.js path utilities
  - express-session: session management for authentication
*/
const express = require('express');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');

/*
  app setup:
  create express application instance
*/
const app = express();

/*
  middleware configuration:
  - parse url-encoded bodies (as sent by html forms)
  - parse json bodies (as sent by api clients)
  - serve static files from the public directory (css, js, images)
  - set up method override middleware for put/delete in forms
  - set up session middleware for user authentication
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

/*
  session configuration:
  - secret: used to sign the session id cookie
  - resave: forces session to be saved back to session store
  - saveUninitialized: forces a session that is uninitialized to be saved
  - cookie: session cookie settings
*/
app.use(session({
    secret: 'blogparty-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, 
        // 24 hours
        maxAge: 24 * 60 * 60 * 1000 
    }
}));

/*
  view engine setup:
  - set the view engine to ejs
  - set the views directory
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/*
  route imports and configuration:
  - import the auth router for authentication routes
  - import the posts router for blog post routes
  - use the auth router for all /auth routes (signup, signin, logout)
  - use the posts router for all /posts routes (create, read, update, delete)
*/
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

/*
  root route:
  - handle requests to the root url
  - redirect to the signin page for authentication
*/
app.get('/', (req, res) => {
    res.redirect('/auth/signin');
});

/*
  server startup:
  - start the server on port 3000
  - log a message to confirm the server is running
*/
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
