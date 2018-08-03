const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const Router = require('./router');

const app = express();

//middleware
app.use(bodyParser.json({ type: '*/*' }));

Router(app);

//If not in production
if (process.env.NODE_ENV !== 'production') {
  console.log('Dev');
  //require webpack config and libraries
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.dev.js');

  //use webpackMiddleware
  app.use(webpackMiddleware(webpack(webpackConfig)));
  //if production
} else {
  //serve static files from dist directory
  app.use(express.static('dist'));
}

const port = process.env.PORT || 3005;

const server = http.createServer(app);

server.listen(port, () => console.log('Listening on port:', port));
