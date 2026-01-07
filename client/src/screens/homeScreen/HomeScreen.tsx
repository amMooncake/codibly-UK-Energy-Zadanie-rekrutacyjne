import { useState } from 'react';
import { BestWindow } from "@/types";

import MyPieChart from './components/PieChart';
import { DailyData } from '../../types.js';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { Button } from "@/components/ui/button"
import Stepper from './components/Stepper';
import BestTimeToChargeCard from './components/BestToChargeCard';
import { Spinner } from '@/components/ui/spinner';

export default function HomeScreen({ generationData }: { generationData: DailyData[] }) {

    const [bestWindowData, setbestWindowData] = useState<BestWindow | null>(null);
    const [hours, setHours] = useState<number>(3);
    const [loadingBestWindow, setLoadingBestWindow] = useState<boolean>(false);


    const handleBestWindowFetch = () => {
        setLoadingBestWindow(true);
        // console.log(loadingBestWindow);
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
        <div className='p-4 sm:p-10 mx-3 mb-3 sm:mb-10 sm:mx-10 sm:mt-5 flex flex-col items-center justify-center bg-slate-700 rounded-xl'>
            <p className='mb-5 text-xl font-bold text-center text-white'> Electric Vehicle Charging Optimizer </p>
            <div className='flex flex-col w-fit'>
                <div className='flex flex-col'>
                    <p className='text-white text-start'>Select number of hours</p>

                    <div className='my-2 flex flex-col sm:flex-row gap-4'>
                        <Stepper hours={hours} setHours={setHours}></Stepper>
                        <Button className='w-fit' variant="outline" onClick={() => {
                            handleBestWindowFetch();
                        }} >Find Optimal Window</Button>
                    </div>

                </div>
                <div className='flex flex-col justify-center w-fit' >
                    <p className='mt-2 mb-1 font-bold text-white'>Best time to charge:</p>
                    <div className="relative">
                        <BestTimeToChargeCard bestWindowData={bestWindowData}></BestTimeToChargeCard>
                        {loadingBestWindow && (
                            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-xl">
                                <Spinner></Spinner>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>

        <div className='flex flex-col'>
            <div className='mx-3 py-10 sm:mx-10 bg-slate-100 rounded-xl '>
                <p className='mb-10 text-xl font-bold text-center'> UK Energy Mix Forecast </p>
                <div className='flex flex-row flex-wrap justify-center'>
                    <MyPieChart isAnimationActive={false} dailyData={generationData[0]} date={"Today"} />
                    <MyPieChart isAnimationActive={false} dailyData={generationData[1]} date={"Tomorrow"} />
                    <MyPieChart isAnimationActive={false} dailyData={generationData[2]} date={"Day After Tomorrow"} />
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
}