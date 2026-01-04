export interface GenerationMix {
    fuel: string;
    perc: number;
}

export interface IntervalData {
    from: string;
    to: string;
    generationmix: GenerationMix[];
}