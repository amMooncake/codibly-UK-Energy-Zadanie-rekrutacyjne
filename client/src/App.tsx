import React, {useEffect, useState} from 'react';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => setBackendData(data));
  }, []);
  console.log(backendData);

  return (
    <div>
      {/* {typeof backendData.data === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        // backendData[0].data.map((item: any, i: number) => ());
      )
      } */}
    </div>
  );
}

export default App;
