import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }


  res.status(500).json({
    message:
      process.env.NODE_ENV === 'production'
        ? 'Щось пішло не так :)'
        : err.message,
  });
};
