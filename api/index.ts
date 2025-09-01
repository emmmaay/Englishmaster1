import express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();

app.use(express.json());

// Import your existing routes here
// For now, just a simple endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};