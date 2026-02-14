import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import scoreRoutes from './routes/score.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Serve static files from the Frontend directory
const frontendPath = path.join(__dirname, '../../Frontend');
app.use(express.static(frontendPath));

app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ClassHive Backend is running' });
});

// Serve homepage.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'homepage.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
