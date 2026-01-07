import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './screens/dashboard/Dashboard';
import { DailyData } from './types.js';

vi.mock('./screens/dashboard/components/PieChart', () => ({
  default: ({ date }: any) => <div>{date}</div>,
}));

global.fetch = vi.fn();

describe('Dashboard Component', () => {
  it('renders and displays fetched carbon data', async () => {
    
    const mockData: DailyData[] = [
      {
        date: '2024-01-01',
        generationmix: [
          { fuel: 'gas', perc: 50 },
          { fuel: 'wind', perc: 50 },
        ],
      },
      {
        date: '2024-01-02',
        generationmix: [
          { fuel: 'gas', perc: 60 },
          { fuel: 'wind', perc: 40 },
        ],
      },
      {
        date: '2024-01-03',
        generationmix: [],
      },
    ];

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    render(<Dashboard generationData={mockData} />);

    await waitFor(() => {
      expect(screen.getByText("UK Energy Mix Forecast")).toBeInTheDocument();
      expect(screen.getByText("Today")).toBeInTheDocument();
    });
  });
});