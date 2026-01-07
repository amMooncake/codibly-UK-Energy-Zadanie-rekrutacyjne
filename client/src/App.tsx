import { useEffect, useState } from 'react';

import LoadingScreen from "./screens/loadingScreen/LoadingScreen";
import DashBoard from './screens/dashboard/Dashboard';


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
        {generationData.length === 0 ? (
          <LoadingScreen></LoadingScreen>
        ) : (
          <DashBoard generationData={generationData}></DashBoard>
        )}
      </div>
    </>
  );
}

export default App;