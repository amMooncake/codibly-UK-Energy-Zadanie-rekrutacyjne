import PieChartExample from './components/PieChart';
import ChargingWindow from './components/ChargingWindow'
import { DailyData } from '../../types.js';
import { Topbar } from './components/Topbar';


export default function HomeScreen({ generationData }: { generationData: DailyData[] }) {

    return <>
        <Topbar />
        <div className='flex flex-col'>
            <div className='mx-10 bg-slate-100 rounded-xl '>
                <p className='my-5 text-xl font-bold text-center'> UK Energy Mix Forecast </p>
                <div className='flex flex-row flex-wrap justify-center'>
                    <PieChartExample isAnimationActive={false} data={generationData[0].generationmix} date={generationData[0].date} />
                    <PieChartExample isAnimationActive={false} data={generationData[1].generationmix} date={generationData[1].date} />
                    <PieChartExample isAnimationActive={false} data={generationData[2].generationmix} date={generationData[2].date} />
                </div>

            </div>

            <div className='py-10 mx-10 my-10 flex flex-row justify-center flex-wrap bg-slate-100 rounded-xl '>
                <ChargingWindow></ChargingWindow>

            </div>


        </div>
    </>
}