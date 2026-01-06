import { IntervalData } from '../types.js';

export const fetchGenerationData = async (fromDate?: string, days?: number): Promise<IntervalData[]> => {
    let from : Date

    if(fromDate == null){
        from = new Date()
        from.setUTCHours(0, 1, 0, 0)
    }else{
        from = new Date(fromDate)
    }

    // console.log(from)
    // console.log(fromDate)


    const to = new Date(from);
    const numberOfDays = days ?? 3;
    to.setUTCDate(to.getUTCDate() + numberOfDays);
    to.setUTCHours(0, 0, 0, 0);

    const formatDate = (date: Date) => date.toISOString().slice(0, 16) + 'Z';
    const url = `https://api.carbonintensity.org.uk/generation/${formatDate(from)}/${formatDate(to)}`;
    // console.log(url);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`External API error: ${response.statusText}`);
    }
    const apiResponse = await response.json();
    return apiResponse.data;
};