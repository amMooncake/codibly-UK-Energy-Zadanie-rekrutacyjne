import express, { Request, Response } from 'express';
const app = express();
const port = 5001;


app.get('/api', async (req: Request, res: Response) => {
    try {
        const now = new Date();
        const from = new Date(now);
        from.setUTCHours(0, 0, 0, 0);

        const to = new Date(now);
        to.setDate(to.getDate() + 3);
        to.setUTCHours(0, 0, 0, 0);

        const formatDate = (date: Date) => date.toISOString().slice(0, 16) + 'Z';

        const response = await fetch(`https://api.carbonintensity.org.uk/generation/${formatDate(from)}/${formatDate(to)}`);
        console.log
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});