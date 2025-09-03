import express from 'express';
import cors from 'cors';
import { ErrorResponse } from './utils/ErrorResponse';
import errorHandler from './middleware/errorHandler';
import asyncHandler from './middleware/async';
import { AppResponse } from './utils/AppResponse';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', asyncHandler(async (req: express.Request, res: express.Response) => {
  return AppResponse(res, 200, null, 'Welcome...');
}));

// Catch all undefined routes
app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404);
  next(error);
});

app.use(errorHandler);

export default app;