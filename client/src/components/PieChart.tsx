import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { GenerationMix } from '../types';

const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
    '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c'
];

export default function PieChartExample({ isAnimationActive = true, data, date }: { isAnimationActive?: boolean, data: GenerationMix[], date?: string }) {
    return <PieChart
        style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
    >
        <Pie
            data={data as any}
            dataKey="perc"
            nameKey="fuel"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            label={({ name, value }) => {
                if (value === 0) return null;
                return `${name}: ${value}%`;
            }}
            isAnimationActive={isAnimationActive}
        >
            {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
            ))}
        </Pie> 
        
        <Tooltip formatter={(value: number | undefined, name: string | undefined) => [`${value ?? 0}%`, name ?? '']} />
        
        <Legend />
    </PieChart>
}
