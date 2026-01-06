import { useEffect, useState } from 'react';

import LoadingScreen from "./screens/loadingScreen/LoadingScreen";
import HomeScreen from './screens/homeScreen/HomeScreen';


import { DailyData } from './types.js';

function App() {
  const [generationData, setGenerationData] = useState<DailyData[]>([]);

  useEffect(() => {
    fetch('/api/generationmix')
      .then(response => response.json())
      .then(data => setGenerationData(data));
  }, []);

  return (
    <>

      <div className=" bg-white min-h-screen">
        {typeof generationData[0] === 'undefined' ? (
          <LoadingScreen></LoadingScreen>
        ) : (
          <HomeScreen generationData={generationData}></HomeScreen>
        )}
      </div>
    </>
  );
}

export default App;