import React, { useEffect, useState } from 'react';
import PieChartExample from './components/PieChart';
import { DailyData } from './types.js';

function App() {
  const [backendData, setBackendData] = useState<DailyData[]>([]);

  useEffect(() => {
    fetch('/api/generationmix')
      .then(response => response.json())
      .then(data => setBackendData(data));
  }, []);

  // console.log("data:", backendData[0]?.generationmix);

  return (
    <div>

      {typeof backendData[0] === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        <>
          <PieChartExample isAnimationActive={false} data={backendData[0].generationmix} date={backendData[0].date} />
          <PieChartExample isAnimationActive={false} data={backendData[1].generationmix} date={backendData[1].date} />
          <PieChartExample isAnimationActive={false} data={backendData[2].generationmix} date={backendData[2].date} />
        </>


      )
      }
    </div>
  );
}

export default App;
