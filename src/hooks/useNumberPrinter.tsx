import { useState } from 'react';

const useNumberPrinter = () => {
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

  return { maxNumber, numbers, handleChange };
};

export default useNumberPrinter;