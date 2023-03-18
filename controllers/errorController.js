const AppError = require("../utils/appError");

const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
}

const handleCastErrorDb = err => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
}

const handleDuplicatedFieldsDb = err => {
  const value = err.keyValue.name;
  const message = `Duplicated value: ${value}. Please use another`;

  return new AppError(message, 400);
}

const sendErrProd = (err, res) => {
  if(err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
}

module.exports =  (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if(process.env.NODE_ENV === 'development') {
    sendErrDev(err, res);
  } else if(process.env.NODE_ENV === 'production') {
    let error = {...err}
    if(error.name === 'CastError') error = handleCastErrorDb(error);
    if(error.code === 11000) error = handleDuplicatedFieldsDb(error);

    sendErrProd(error, res);
  }
}
