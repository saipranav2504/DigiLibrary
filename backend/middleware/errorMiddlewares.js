// errorHandler.js

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // Default values
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle specific errors
  if (err.code === 11000) {
    err = new ErrorHandler("Duplicate field value", 400);
  }

  if (err.name === "JSONWebTokenError") {
    err = new ErrorHandler("Invalid JWT. Try Again", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("JWT is Expired. Try Again", 400);
  }

  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
  }

  // Handle validation errors (like Mongoose)
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(", ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
