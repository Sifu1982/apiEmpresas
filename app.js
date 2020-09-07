const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const apiRouter = require('./routes/api');

// Carga del fichero de entorno .env
require('dotenv').config();

// Conexión a la base de datos
require('./dbConfig').connect();
// // Prueba de conexión base de datos
// db.query('select * from empleados', (err, rows) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(rows);
// });
// // Prueba OK

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 
 * GESTOR DE RUTAS
 * 
 */

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
