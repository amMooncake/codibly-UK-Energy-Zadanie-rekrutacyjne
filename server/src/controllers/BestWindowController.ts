import { Request, Response } from 'express';
import { fetchGenerationData } from '../services/CarbonIntensityfetch.js';
import { IntervalData } from '../types.js';

const ECO_FUELS: string[] = ["biomass", "nuclear", "hydro", "wind", "solar"];


export const calculateEcoPercentage = (intervalData: IntervalData[], hours: number) => {
    const windowSize = hours * 2; // API returns 30-minute intervals
    let bestWindow: { from: string; to: string; averageEcoPercent: number } = {
        from: "",
        to: "",
        averageEcoPercent: 0
    };
    let maxAvgEco = -1;


    for (let i = 0; i <= intervalData.length - windowSize; i++) {
        let windowEcoSum = 0;

        for (let ii = 0; ii < windowSize; ii++) {
            const interval = intervalData[i + ii];

            // sum window
            let intervalEcoTotal = 0;
            for (const item of interval.generationmix) {
                if (ECO_FUELS.includes(item.fuel)) {
                    intervalEcoTotal += item.perc;
                }
            }
            windowEcoSum += intervalEcoTotal;
        }

        const currentAvgEco = windowEcoSum / windowSize;

        // check if calculated eco window procentage is grater than max
        if (currentAvgEco > maxAvgEco) {
            maxAvgEco = currentAvgEco;
            bestWindow = {
                from: intervalData[i].from,
                to: intervalData[i + windowSize - 1].to,
                averageEcoPercent: Math.round(currentAvgEco * 100) / 100
            };
        }
    }
    return bestWindow;
};



export const calculateBestChargingWindow = async (req: Request, res: Response) => {
    const { hours } = req.body;

    let bestWindow;

    // TODO prevent inputing wrong data on client side
    if (!hours || typeof hours !== 'number' || hours < 1 || hours > 6) {
        return res.status(400).json({
            error: 'Invalid input. Please provide "hours" as a number between 1 and 6.'
        });
    }

    try {
        // I'm requesting data from the next half hour to two days in the future.
        // NESO stores data only for the next 48 hours, so it will return data from (now + 1-30 min) to (now + 48 hours)
        // also, I'm using UTC time
        const from = new Date();
        from.setUTCMinutes(from.getUTCMinutes() + 30);
        const intervalData: IntervalData[] = await fetchGenerationData(from.toISOString(), 3);

        if (!intervalData || intervalData.length === 0) {
            return res.status(500).json({ error: 'Failed to retrieve generation data.' });
        }

        bestWindow = calculateEcoPercentage(intervalData, hours);

        res.json(bestWindow);

    } catch (error) {
        console.error('Error calculating best window:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};