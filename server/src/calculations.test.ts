import { describe, it, expect } from 'vitest';
import { calculateEcoPercentage } from './controllers/BestWindowController.js';
import { IntervalData } from './types.js';

describe('calculateEcoPercentage', () => {
  it('should return the time slot with the highest eco percentage', () => {

    const mockData: IntervalData[] = [
      {
        from: '10:00',
        to: '10:30',
        generationmix: [{ fuel: 'wind', perc: 20 }, { fuel: 'gas', perc: 80 }]
      },
      {
        from: '10:30',
        to: '11:00',
        generationmix: [{ fuel: 'wind', perc: 50 }, { fuel: 'gas', perc: 50 }]
      },
      {
        from: '11:00',
        to: '11:30',
        generationmix: [{ fuel: 'wind', perc: 80 }, { fuel: 'gas', perc: 20 }]
      },
    ];

    const result = calculateEcoPercentage(mockData, 1);

    expect(result.averageEcoPercent).toBe(65);
    expect(result.from).toBe('10:30');
    expect(result.to).toBe('11:30');
  });

  it('should return default object if data is empty', () => {
    const result = calculateEcoPercentage([], 1);
    expect(result.averageEcoPercent).toBe(0);
  });
});