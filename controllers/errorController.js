import AppError from './../utils/appError.js';

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/"(.*?)"/)[1];
  console.log(value);
  const message = `Duplicate key value: ${value}. Please use another value! `;
  return new AppError(message, 400);
};

const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;

  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // console.log(err.message);
  // console.log(err.isOperational);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // console.error('Error!!!!!!', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

export default (err, req, res, next) => {
  console.log('entered global handler');

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // eslint-disable-next-line no-undef
  const env = process.env.NODE_ENV.trim();
  if (env === 'development') {
    console.log('entered development handler');

    sendErrorDev(err, res);
  } else if (env === 'production') {
    console.log('entered production handler');

    let error = err;
    // console.log(err.code);

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationError(error);

    sendErrorProd(error, res);
  }
};
