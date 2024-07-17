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

test('prevents negative number inputs and shows nothing', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i) as HTMLInputElement;
  const widthInput = screen.getByLabelText(/Width/i) as HTMLInputElement;
  
  act(() => {
    fireEvent.change(heightInput, { target: { value: '-10' } });
    fireEvent.change(widthInput, { target: { value: '5' } });
  });

  expect(heightInput.value).toBe(''); 
  expect(widthInput.value).toBe('5'); 

  expect(screen.queryByText(/The calculated area is:/i)).not.toBeInTheDocument();
});

test('prevents non-numeric inputs and shows nothing', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i) as HTMLInputElement;
  const widthInput = screen.getByLabelText(/Width/i) as HTMLInputElement;
  
  act(() => {
    fireEvent.change(heightInput, { target: { value: 'abc' } });
    fireEvent.change(widthInput, { target: { value: '5' } });
  });

  expect(heightInput.value).toBe(''); 
  expect(widthInput.value).toBe('5'); 

  expect(screen.queryByText(/The calculated area is:/i)).not.toBeInTheDocument();
});

test('handles zero values gracefully', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i);
  const widthInput = screen.getByLabelText(/Width/i);
  
  fireEvent.change(heightInput, { target: { value: '0' } });
  fireEvent.change(widthInput, { target: { value: '5' } });

  expect(screen.getByText(/The calculated area is: 0/i)).toBeInTheDocument();
});

test('handles extreme values gracefully', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i);
  const widthInput = screen.getByLabelText(/Width/i);
  
  fireEvent.change(heightInput, { target: { value: '1000000000' } });
  fireEvent.change(widthInput, { target: { value: '0.0000001' } });

  const expectedArea = (1000000000 * 0.0000001) / 2;

  expect(screen.getByText(`The calculated area is: ${expectedArea}`)).toBeInTheDocument();
});

test('handles decimal inputs correctly', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i);
  const widthInput = screen.getByLabelText(/Width/i);
  
  fireEvent.change(heightInput, { target: { value: '3.5' } });
  fireEvent.change(widthInput, { target: { value: '2' } });

  expect(screen.getByText(/The calculated area is: 3.5/i)).toBeInTheDocument();
});
