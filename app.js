var express = require('express')
  , path = require('path')
  , app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error');
});
module.exports = app;