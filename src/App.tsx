import React from 'react';
import NumberPrinter from './components/NumberPrinter';
import TriangleAreaCalculator from './components/TriangleAreaCalculator';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <NumberPrinter />
      <TriangleAreaCalculator />
    </div>
  );
};

export default App;
