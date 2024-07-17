import React, { useState } from 'react';

const NumberPrinter: React.FC = () => {
  const [maxNumber, setMaxNumber] = useState<number | undefined>(undefined);
  const [numbers, setNumbers] = useState<number[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMaxNumber(value);
    if (!isNaN(value)) {
      setNumbers(Array.from({ length: value }, (_, i) => i + 1));
    } else {
      setNumbers([]);
    }
  };

  return (
    <div>
      <label htmlFor="maxNumberInput">Max Number to Print</label>
      <input id="maxNumberInput" type="number" onChange={handleChange} />
      <div className="output">
        The printed numbers: {numbers.join(', ')}
      </div>
    </div>
  );
};

export default NumberPrinter;
