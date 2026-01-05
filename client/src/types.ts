export interface GenerationMix {
    fuel: string;
    perc: number;
}

export interface DailyData {
    date: string;
    generationmix: GenerationMix[];
}