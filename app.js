var express = require('express'),
    constants = require('constants'),
    fs = require('fs'),
    path = require('path'),
    helmet = require('helmet'),
    http = require('http'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index'),
    roadmap = require('./routes/roadmap');

var app = express();

app.set('view cache', false);
app.disable('x-powered-by');
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(sassMiddleware({
  src: path.join(__dirname, 'public/stylesheets/sass'),
  dest: path.join(__dirname, 'public/stylesheets'),
  debug: false,
  indentedSyntax: true,
  outputStyle: 'compressed',
  prefix: '/stylesheets'
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/roadmap', roadmap);

module.exports = app;

app.listen(8002, 'localhost');
