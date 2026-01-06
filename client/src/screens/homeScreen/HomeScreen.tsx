import { useState } from 'react';
import { BestWindow } from "@/types";

import MyPieChart from './components/PieChart';
import { DailyData } from '../../types.js';
import Topbar from '../../components/Topbar';
import { Button } from "@/components/ui/button"
import Stepper from './components/Stepper';
import BestTimeToCharge from './components/BestToCharge';
import { Card } from '@/components/ui/card.js';

export default function HomeScreen({ generationData }: { generationData: DailyData[] }) {

    const [bestWindowData, setbestWindowData] = useState<BestWindow | null>(null);
    const [hours, setHours] = useState<number>(6);
    const [loadingBestWindow, setLoadingBestWindow] = useState<boolean>(false);


    const handleBestWindowFetch = () => {
        setLoadingBestWindow(true);
        console.log(loadingBestWindow);
        fetch('/api/generationmix/best-window', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hours: hours }),
        })
            .then(response => response.json())
            .then(data => {
                setbestWindowData(data);
                setLoadingBestWindow(false);
            })
            .catch(error => {
                console.error('Error fetching best window:', error);
                setLoadingBestWindow(false);
            });
    };


    return <>
        <Topbar />
        <div className='flex flex-col'>
            <div className='mx-10 py-10 bg-slate-100 rounded-xl '>
                <p className='mb-10 text-xl font-bold text-center'> UK Energy Mix Forecast </p>
                <div className='flex flex-row flex-wrap justify-center'>
                    <MyPieChart isAnimationActive={true} dailyData={generationData[0]} date={"Today"} />
                    <MyPieChart isAnimationActive={true} dailyData={generationData[1]} date={"Tomorrow"} />
                    <MyPieChart isAnimationActive={true} dailyData={generationData[2]} date={"Day After Tomorrow"} />
                </div>

            </div>

            <div className='p-10 mx-10 my-10 flex flex-col justify-center bg-slate-700 rounded-xl'>

                <p className='mb-10 text-xl font-bold text-center text-white'> EV Charging Optimizer </p>
                <div className='flex flex-col justify-between items-center'>
                    <div className='flex flex-row gap-5'>
                        <Stepper hours={hours} setHours={setHours}></Stepper>
                        <Button variant="outline" onClick={() => {
                            handleBestWindowFetch();
                        }}>Find Optimal Window</Button>
                    </div>
                    <div className='flex flex-col justify-center w-fit' >
                        <p className='mt-2 mb-1 font-bold text-white'>Best time to charge:</p>
                        {loadingBestWindow ? (
                                <p className='text-white'>Loading...</p>

                        ) : (
                            <BestTimeToCharge bestWindowData={bestWindowData}></BestTimeToCharge>
                        )}

                    </div>
                </div>


            </div>


        </div>
    </>
}