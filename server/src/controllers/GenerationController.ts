import { Request, Response } from 'express';
import { IntervalData } from '../types.js';

export const getGenerationData = async (req: Request, res: Response) => {
    try {
        //composing date range for API request
        const now = new Date();
        const from = new Date(now);
        from.setUTCHours(0, 1, 0, 0);

        const to: Date = new Date(now);
        to.setDate(to.getDate() + 2);
        to.setUTCHours(23, 59, 0, 0);

        const formatDate = (date: Date) => date.toISOString().slice(0, 16) + 'Z';
        const response = await fetch(`https://api.carbonintensity.org.uk/generation/${formatDate(from)}/${formatDate(to)}`);

        const apiResponse = await response.json();


        const groupedData: Record<string, Record<string, { sum: number; count: number }>> = {};

        if (apiResponse.data) {
            apiResponse.data.forEach((interval: IntervalData) => {
                const date = interval.from.slice(0, 10); // date format example: "2026-01-04"
                if (!groupedData[date]) {
                    groupedData[date] = {};
                }

                //calculating entries and sum for each fuel type
                interval.generationmix.forEach((mix) => {
                    if (!groupedData[date][mix.fuel]) {
                        groupedData[date][mix.fuel] = { sum: 0, count: 0 };
                    }
                    groupedData[date][mix.fuel].sum += mix.perc;
                    groupedData[date][mix.fuel].count += 1;
                });
            });
        }

        console.log(groupedData);

        //data for response
        const result = Object.entries(groupedData).map(([date, fuelsData]) => {
            const generationmix = Object.entries(fuelsData).map(([fuel, { sum, count }]) => (
                {
                    fuel,
                    // calculating average percentage for each fuel type
                    perc: Math.round((sum / count) * 100) / 100,
                }
            ));
            return { date, generationmix };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};