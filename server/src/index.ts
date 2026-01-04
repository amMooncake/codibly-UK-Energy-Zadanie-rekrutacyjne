import express from 'express';
import generationRoutes from './routes/generation.js';

const app = express();
const port = 5001;

app.use('/api/generationmix', generationRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});