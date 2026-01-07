import express from 'express';
import generationRoutes from './routes/generation.js';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8080;

//absolute path to the public directory for the server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

//tells Express to serve any files it finds in the /public directory
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use('/api/generationmix', generationRoutes);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});