import app from './app';
import { createServer } from 'http';
import connectDB from './config/db';

const PORT = process.env.PORT;

const server = createServer(app);

// Connect database
connectDB();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});