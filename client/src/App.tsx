import React, {useEffect, useState} from 'react';

interface GenerationMix {
  fuel: string;
  perc: number;
}

interface DailyData {
  date: string;
  generationmix: GenerationMix[];
}

function App() {
  const [backendData, setBackendData] = useState<DailyData[]>([]);

  useEffect(() => {
    fetch('/api/generationmix')
      .then(response => response.json())
      .then(data => setBackendData(data));
  }, []);
  console.log(backendData);

  return (
    <div>
      {typeof backendData[0] === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        <p>{backendData[0].date.toString()}</p>
      )
      }
    </div>
  );
}

export default App;
