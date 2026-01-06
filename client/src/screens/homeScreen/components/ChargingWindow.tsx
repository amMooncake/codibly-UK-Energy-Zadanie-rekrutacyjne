import { useState } from 'react';
import { BestWindow } from '../../../types.js';


export default function ChargingWindow() {
    const [backendData, setBackendData] = useState<BestWindow | null>(null);
    const [hours, setHours] = useState<number>(6);
    const [loadingBestWindow, setLoadingBestWindow] = useState<boolean>(false);


    const handleBestWindowFetch = () => {
        setLoadingBestWindow(true);
        fetch('/api/generationmix/best-window', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hours: hours }),
        })
            .then(response => response.json())
            .then(data => {
                setBackendData(data);
                setLoadingBestWindow(false);
            })
            .catch(error => {
                console.error('Error fetching best window:', error);
                setLoadingBestWindow(false);
            });
    };

    return <>
        <div>
            <h2>Find Best Charging Window</h2>
            <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                min="1"
                max="6"
            />
            <button onClick={handleBestWindowFetch} disabled={loadingBestWindow}>
                {loadingBestWindow ? 'Finding...' : 'Find Best Window'}
            </button>
        </div>

        {
            backendData && (
                <div>
                    <h3>Best Charging Window Found:</h3>
                    <p>From: {backendData.from}</p>
                    <p>To: {backendData.to}</p>
                    <p>Average Eco Percentage: {backendData.averageEcoPercent}%</p>
                </div>
            )
        }
    </>
}