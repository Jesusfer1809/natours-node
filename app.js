const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1)MIDDLEWARES

app.use(morgan('dev'));

app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Hello from the middleware!');
//   req.requestTime = new Date().toISOString();
//   next();
// });

//3)ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', function (req, res, next) {
  //   const err = new Error(`Can't find ${req.originalUrl} on this server`);
  //   err.status = 'fail';
  //   err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
