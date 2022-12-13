import React, { useEffect, useState } from 'react';
import './App.css';
import './components/Survey/OverridePropertyGrid';
import SurveyComponent from './components/Survey/SurveyCreatorComponent';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="App">
      <SurveyComponent />
    </div>
  );
}

export default App;
