/*
  dependencies:
  - express: web framework for node.js
  - method-override: allows put/delete in forms
  - ejs: templating engine
  - path: node.js path utilities
*/
const express = require('express');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');

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
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

/*
  view engine setup:
  - set the view engine to ejs
  - set the views directory
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/*
  route imports and configuration:
  - import the posts router
  - use the posts router for all /posts routes (create, read, update, delete)
*/
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

/*
  root route:
  - handle requests to the root url
  - redirect to the main page of the application
*/
app.get('/', (req, res) => {
    res.redirect('/posts');
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
