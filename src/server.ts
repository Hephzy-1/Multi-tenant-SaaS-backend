import app from './app.ts';
import { createServer } from 'http';
import connectDB from './config/db.ts';

const PORT = process.env.PORT || 3000;

const server = createServer(app);
connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});