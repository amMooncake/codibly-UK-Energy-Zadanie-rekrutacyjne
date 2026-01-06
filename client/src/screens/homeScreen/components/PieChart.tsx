import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { DailyData } from '../../../types';


const ECO_COLORS: string[] = [
    '#AED581',
    '#66BB6A',
    '#26A69A',
    '#4DD0E1',
    '#2E7D32',
];

const NON_ECO_COLORS: string[] = [
    '#8D6E63',
    '#FF7043',
    '#D32F2F',
    '#546E7A',
    '#424242',

];

const ECO = [
    'biomass', 'nuclear', 'hydro', 'wind', 'solar'
]

const RADIAN = Math.PI / 180;

export default function MyPieChart({ isAnimationActive = true, dailyData, date}: { isAnimationActive?: boolean, dailyData: DailyData, date: string }) {
    let ecoPerc: number = 0;

    // remove entries with 0 percentage
    const data = dailyData.generationmix.filter(entry => entry.perc > 0);

    // sort array
    data.sort((a, b) => {
        const isA = ECO.includes(a.fuel);
        const isB = ECO.includes(b.fuel);
        return isA === isB ? 0 : isA ? -1 : 1;
    });

    // console.log(data);

    //calculating percentage of eco energy
    data.forEach(element => {
        if (ECO.includes(element.fuel)) ecoPerc += element.perc
    });
    ecoPerc = Math.round(ecoPerc * 100) / 100

    const ecoData = [
        { name: 'eco', value: ecoPerc },
        { name: "non-eco", value: 100 - ecoPerc }
    ];

    return <PieChart
        style={{ width: '100%', maxWidth: '450px', maxHeight: '450px', aspectRatio: 1.2 }}
        margin={{ top: 0, right: 50, bottom: 10, left: 50 }}
    >
        <text x="50%" y="5%" textAnchor="middle" dominantBaseline="middle" className="font-light">
            {date}
        </text>

        <Pie
            data={data as any}
            dataKey="perc"
            nameKey="fuel"
            innerRadius="25%"
            outerRadius="50%"
            label={({ name, value }) => `${name}: ${value}%`}
            isAnimationActive={isAnimationActive}
        >
            {data?.map((entry, index) =>
                entry.fuel && ECO.includes(entry.fuel) ? (
                    <Cell key={`cell-${index}`} fill={ECO_COLORS[index % ECO_COLORS.length]} />
                ) : (
                    <Cell key={`cell-${index}`} fill={NON_ECO_COLORS[index % NON_ECO_COLORS.length]} />
                )
            )}

        </Pie>

        <Pie
            data={ecoData as any}
            dataKey="value"
            nameKey="name"
            outerRadius="25%"
            labelLine={false}

            // label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
            //     const radius = (innerRadius ?? 0) + ((outerRadius ?? 0) - (innerRadius ?? 0)) * 0.5;
            //     const x = (cx ?? 0) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
            //     const y = (cy ?? 0) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
            //     return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '15px', fontWeight: 'bold' }}>{name}</text>
            // }}

            isAnimationActive={isAnimationActive}
        >
            <Cell key={`cell-1`} fill={ECO_COLORS[1]} />
            <Cell key={`cell-2`} fill={NON_ECO_COLORS[2]} />
        </Pie>

        <Legend
            verticalAlign="bottom"
            align="center"
            content={() => (
                <div className="flex justify-center gap-5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3" style={{ backgroundColor: ECO_COLORS[1] }}></div>
                        <span className="text-sm text-gray-800">Eco: {ecoPerc}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3" style={{ backgroundColor: NON_ECO_COLORS[2] }}></div>
                        <span className="text-sm text-gray-800">Non-Eco: {Math.round((100 - ecoPerc) * 100) / 100}%</span>
                    </div>
                </div>
            )}
        />

        <Tooltip formatter={(value: number | undefined, name: string | undefined) => [`${value ?? 0}%`, name ?? '']} />

    </PieChart>
}
