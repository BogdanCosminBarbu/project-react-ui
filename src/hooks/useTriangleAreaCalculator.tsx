import { useState } from 'react';

const useTriangleAreaCalculator = () => {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [area, setArea] = useState<number | undefined>(undefined);

  const calculateArea = (h: number, w: number) => (h * w) / 2;

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = parseFloat(e.target.value);
    setHeight(h);
    if (width !== undefined) {
      setArea(calculateArea(h, width));
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w = parseFloat(e.target.value);
    setWidth(w);
    if (height !== undefined) {
      setArea(calculateArea(height, w));
    }
  };

  return { height, width, area, handleHeightChange, handleWidthChange };
};

export default useTriangleAreaCalculator;