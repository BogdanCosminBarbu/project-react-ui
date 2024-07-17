import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import TriangleAreaCalculator from '../components/TriangleAreaCalculator';

test('renders triangle area calculator and calculates area', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i);
  const widthInput = screen.getByLabelText(/Width/i);
  
  act(() => {
    fireEvent.change(heightInput, { target: { value: '10' } });
    fireEvent.change(widthInput, { target: { value: '5' } });
  });

  expect(screen.getByText(/The calculated area is: 25/)).toBeInTheDocument();
});
