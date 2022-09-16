import React, { useEffect, useState } from 'react';
import { ReactElementFactory } from 'survey-react-ui';
import './App.css';
import './components/Survey/OverridePropertyGrid';
import CustomPropertyGridWrapper from './components/Survey/OverridePropertyGrid';
import SurveyComponent from './components/Survey/SurveyCreatorComponent';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    ReactElementFactory.Instance.registerElement('svc-property-grid', (props) => {
      return React.createElement(CustomPropertyGridWrapper, props);
    });
    return () => {};
  }, []);

  return (
    <div className="App">
      <SurveyComponent />
    </div>
  );
}

export default App;
