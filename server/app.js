const path = require('path');

const koa = require('koa');
const router = require('koa-router')();
const render = require('koa-ejs');
const logger = require('koa-logger');
const compress = require('koa-compress');

const webpack = require('webpack');
const config = require('../webpack-dev.config');

const app = koa();
const compiler = webpack(config);

app.use(require('koa-webpack-dev-middleware')(compiler, {
  // noInfo: true,
  stats: {
    colors: true
  },
  publicPath: config.output.publicPath
}));

app.use(require('koa-webpack-hot-middleware')(compiler));

/**
 * logger
 */
app.use(logger());

/**
 * respone compress
 */
app.use(compress({
  // filter: function (content_type) {
  // 	return /text/i.test(content_type)
  // },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));

/**
 * ejs
 * 它会在koa context中加入render()
 */
render(app, {
  root: path.join(__dirname, '../public'),
  layout: false,
  viewExt: 'html',
  debug: true,
  cache: true
});

//routes
require('./routes')(router);
app.use(router.routes());


app.listen(2000, 'localhost', function () {
  console.log('Listening at http://localhost:2000');
});

