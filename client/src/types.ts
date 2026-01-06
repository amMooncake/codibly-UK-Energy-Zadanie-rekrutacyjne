export interface GenerationMix {
    fuel: string;
    perc: number;
}

export interface DailyData {
    date: string;
    generationmix: GenerationMix[];
}

export interface BestWindow{
    averageEcoPercent: number;
    from: String;
    to: string;
}