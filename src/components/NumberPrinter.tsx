import React, { useState } from 'react';

const NumberPrinter: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const sanitizedValue = value.replace(/\D/g, '');

    e.target.value = sanitizedValue;

    if (sanitizedValue !== '') {
      const parsedValue = parseInt(sanitizedValue, 10);
      setNumbers(Array.from({ length: parsedValue }, (_, i) => i + 1));
    } else {
      setNumbers([]);
    }
  };

  return (
    <div>
      <label htmlFor="maxNumberInput">Max Number to Print</label>
      <input
        id="maxNumberInput"
        type="text"
        onChange={handleChange}
        onInput={handleChange} 
        value={numbers.length > 0 ? numbers.length.toString() : ''} 
      />
      <div className="output">
        The printed numbers: {numbers.join(', ')}
      </div>
    </div>
  );
};

export default NumberPrinter;
