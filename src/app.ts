import express from 'express';
import cors from 'cors';
import { ErrorResponse } from './utils/ErrorResponse';
import errorHandler from './middleware/errorHandler';
import asyncHandler from './middleware/async';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', asyncHandler(async (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Welcome!' });
}));

// Catch all undefined routes
app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404);
  next(error);
});

app.use(errorHandler);

export default app;