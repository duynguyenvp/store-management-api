export const responseFormatter = (req, res, next) => {
  res.success = (data, metadata = {}, links = {}) => {
    res.status(200).json({
      status: "success",
      data,
      metadata,
      links
    });
  };

  res.error = (message, code = 400, details = {}) => {
    res.status(code).json({
      status: "error",
      error: {
        code,
        message,
        details
      },
      metadata: {
        timestamp: new Date().toISOString()
      }
    });
  };

  next();
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.error(message, statusCode, {
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
};

export function notFound(req, res, next) {
  const statusCode = err.statusCode || 404;
  const message = err.message || 'Not Found';

  res.error(message, statusCode, {
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
}