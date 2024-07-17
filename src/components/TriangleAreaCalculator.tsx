import React, { useState } from 'react';

const TriangleAreaCalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [area, setArea] = useState<number | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value.startsWith('.') && !(name === 'heightInput' && /^\.\d*$/.test(value))) {
      return; 
    }
    if (value.startsWith('.') && !(name === 'widthInput' && /^\.\d*$/.test(value))) {
      return; 
    }

    const parsedValue = value.trim(); 
    if (/^\d*\.?\d*$/.test(parsedValue) || parsedValue === '') {
      if (name === 'heightInput') {
        setHeight(parsedValue);
        calculateArea(parsedValue, width);
      } else if (name === 'widthInput') {
        setWidth(parsedValue);
        calculateArea(height, parsedValue);
      }
    }
  };

  const calculateArea = (h: string, w: string): void => {
    const parsedHeight = parseFloat(h);
    const parsedWidth = parseFloat(w);

    if (!isNaN(parsedHeight) && !isNaN(parsedWidth) && parsedHeight >= 0 && parsedWidth >= 0) {
      setArea((parsedHeight * parsedWidth) / 2);
    } else {
      setArea(undefined);
    }
  };

  return (
    <div>
      <label htmlFor="heightInput">Height</label>
      <input
        id="heightInput"
        type="text"
        value={height}
        onChange={handleChange}
        name="heightInput"
      />
      <label htmlFor="widthInput">Width</label>
      <input
        id="widthInput"
        type="text"
        value={width}
        onChange={handleChange}
        name="widthInput"
      />
      <div className='output'>
        {area !== undefined ? (
          <span>The calculated area is: {area}</span>
        ) : (
          <span>Please enter valid positive numbers for height and width.</span>
        )}
      </div>
    </div>
  );
};

export default TriangleAreaCalculator;
