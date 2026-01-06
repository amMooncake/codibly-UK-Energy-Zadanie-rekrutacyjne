import PieChartExample from './components/PieChart';
import ChargingWindow from './components/ChargingWindow'
import { DailyData } from '../../types.js';
import { Topbar } from '../../components/Topbar';
import { Button } from "@/components/ui/button"
import Stepper from './components/Stepper';


export default function HomeScreen({ generationData }: { generationData: DailyData[] }) {

    return <>
        <Topbar />
        <div className='flex flex-col'>
            <div className='mx-10 py-10 bg-slate-100 rounded-xl '>
                <p className='mb-10 text-xl font-bold text-center'> UK Energy Mix Forecast </p>
                <div className='flex flex-row flex-wrap justify-center'>
                    <PieChartExample isAnimationActive={false} dailyData={generationData[0]} date={"Today"} />
                    <PieChartExample isAnimationActive={false} dailyData={generationData[1]} date={"Tomorrow"} />
                    <PieChartExample isAnimationActive={false} dailyData={generationData[2]} date={"Day After Tomorrow"} />
                </div>

            </div>

            <div className='py-10 mx-10 my-10 flex flex-col justify-center flex-wrap bg-slate-700 rounded-xl '>
                <p className='mb-10 text-xl font-bold text-center text-white'> EV Charging Optimizer </p>
                <div className='flex flex-row justify-center items-center gap-5'>
                    <Stepper></Stepper>
                    <Button variant="outline" onClick={() => { }}>Find Optimal Window</Button>
                </div>
               
            </div>


        </div>
    </>
}