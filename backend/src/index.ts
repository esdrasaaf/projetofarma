import express from 'express';
import cors from 'cors';
import { config } from './config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});