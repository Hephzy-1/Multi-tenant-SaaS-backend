import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, ExtendedError } from '../utils/ErrorResponse';

function errorHandler(err: ExtendedError | Error, req: Request, res: Response, next: NextFunction) {
  let error: ExtendedError = err ;
  
  if (!(err instanceof ErrorResponse)) {
    error = new ErrorResponse(err.message || 'Server Error', 500);
  }

  // Log to console for dev
  console.error(error.statusCode, error.message);

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || 'Server Error',
      statusCode: error.statusCode || 500,
      errors: 'errors' in error ? error.errors : null
    }
  });
};

export default errorHandler;