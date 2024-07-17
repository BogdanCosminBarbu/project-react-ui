import React, { useState } from 'react';

const TriangleAreaCalculator: React.FC = () => {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [area, setArea] = useState<number | undefined>(undefined);

  const calculateArea = (h: number, w: number) => (h * w) / 2;

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = parseFloat(e.target.value);
    setHeight(h);
    if (!isNaN(h) && !isNaN(width || 0)) {
      setArea(calculateArea(h, width || 0));
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w = parseFloat(e.target.value);
    setWidth(w);
    if (!isNaN(w) && !isNaN(height || 0)) {
      setArea(calculateArea(height || 0, w));
    }
  };

  return (
    <div>
      <label htmlFor="heightInput">Height</label>
      <input id="heightInput" type="number" onChange={handleHeightChange} />
      <label htmlFor="widthInput">Width</label>
      <input id="widthInput" type="number" onChange={handleWidthChange} />
      <div className='output'>
        The calculated area is: {area}
      </div>
    </div>
  );
};

export default TriangleAreaCalculator;
