import React, { useEffect, useState } from 'react';
import PieChartExample from './components/PieChart';
import { DailyData, BestWindow } from './types.js';

function App() {
  const [generationData, setGenerationData] = useState<DailyData[]>([]);

  const [backendData, setBackendData] = useState<BestWindow[]>([]);

  useEffect(() => {
    fetch('/api/generationmix')
      .then(response => response.json())
      .then(data => setGenerationData(data));

    fetch('/api/generationmix/best-window', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hours: 6 }),
    })
      .then(response => response.json())
      .then(data => setBackendData(data));
    // .then(data => console.log(data));
  }, []);


  // console.log("data:", backendData[0]?.generationmix);

  return (
    <div>

      {typeof generationData[0] === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        <>
          <PieChartExample isAnimationActive={false} data={generationData[0].generationmix} date={generationData[0].date} />
          <PieChartExample isAnimationActive={false} data={generationData[1].generationmix} date={generationData[1].date} />
          <PieChartExample isAnimationActive={false} data={generationData[2].generationmix} date={generationData[2].date} />
        </>
      )}
    </div>
  );
}

export default App;
