import React, { useEffect, useState } from 'react';
import PieChartExample from './components/PieChart';
import { DailyData, BestWindow } from './types.js';

import { Spinner } from "@/components/ui/spinner"

function App() {
  const [generationData, setGenerationData] = useState<DailyData[]>([]);
  const [backendData, setBackendData] = useState<BestWindow | null>(null);
  const [hours, setHours] = useState<number>(6);
  const [loadingBestWindow, setLoadingBestWindow] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/generationmix')
      .then(response => response.json())
      .then(data => setGenerationData(data));
  }, []);

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

  return (
    <div>

      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      {typeof generationData[0] === 'undefined' ? (
        <Spinner></Spinner>
      ) : (
        <>
          <PieChartExample isAnimationActive={false} data={generationData[0].generationmix} date={generationData[0].date} />
          <PieChartExample isAnimationActive={false} data={generationData[1].generationmix} date={generationData[1].date} />
          <PieChartExample isAnimationActive={false} data={generationData[2].generationmix} date={generationData[2].date} />
        </>
      )}

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

      {backendData && (
        <div>
          <h3>Best Charging Window Found:</h3>
          <p>From: {backendData.from}</p>
          <p>To: {backendData.to}</p>
          <p>Average Eco Percentage: {backendData.averageEcoPercent}%</p>
        </div>
      )}
    </div>
  );
}

export default App;