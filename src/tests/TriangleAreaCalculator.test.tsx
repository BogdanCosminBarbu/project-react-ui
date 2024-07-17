import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import TriangleAreaCalculator from '../components/TriangleAreaCalculator';

test('prevents negative number inputs in height in business logic', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i) as HTMLInputElement; 
  const widthInput = screen.getByLabelText(/Width/i) as HTMLInputElement; 
  
  act(() => {
    fireEvent.change(heightInput, { target: { value: '-10' } });
    fireEvent.change(widthInput, { target: { value: '5' } });
  });

  expect(heightInput.value).toBe(''); 
  expect(widthInput.value).toBe('5'); 
});

test('prevents non-numeric inputs in height in business logic', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i) as HTMLInputElement; 
  const widthInput = screen.getByLabelText(/Width/i) as HTMLInputElement; 
  
  act(() => {
    fireEvent.change(heightInput, { target: { value: 'abc' } });
    fireEvent.change(widthInput, { target: { value: '5' } });
  });

  expect(heightInput.value).toBe(''); 
  expect(widthInput.value).toBe('5'); 
});

test('handles zero values gracefully in business logic', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i) as HTMLInputElement; 
  const widthInput = screen.getByLabelText(/Width/i); 
  
  fireEvent.change(heightInput, { target: { value: '0' } });
  fireEvent.change(widthInput, { target: { value: '5' } });

  expect(heightInput.value).toBe('0'); 
  expect(screen.queryByText(/The calculated area is:/i)).toBeInTheDocument();
});

test('handles decimal inputs correctly in business logic', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i) as HTMLInputElement; 
  const widthInput = screen.getByLabelText(/Width/i); 
  
  fireEvent.change(heightInput, { target: { value: '3.5' } });
  fireEvent.change(widthInput, { target: { value: '2' } });

  expect(heightInput.value).toBe('3.5'); 
});

test('renders triangle area calculator and calculates area in display logic', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i);
  const widthInput = screen.getByLabelText(/Width/i);
  
  act(() => {
    fireEvent.change(heightInput, { target: { value: '10' } });
    fireEvent.change(widthInput, { target: { value: '5' } });
  });

  expect(screen.getByText(/The calculated area is: 25/)).toBeInTheDocument();
});

test('does not render area on negative number inputs in display logic', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i) as HTMLInputElement;
  const widthInput = screen.getByLabelText(/Width/i) as HTMLInputElement;
  
  act(() => {
    fireEvent.change(heightInput, { target: { value: '-10' } });
    fireEvent.change(widthInput, { target: { value: '5' } });
  });

  expect(screen.queryByText(/The calculated area is:/i)).not.toBeInTheDocument();
});

test('does not render area on non-numeric inputs in display logic', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i) as HTMLInputElement;
  const widthInput = screen.getByLabelText(/Width/i) as HTMLInputElement;
  
  act(() => {
    fireEvent.change(heightInput, { target: { value: 'abc' } });
    fireEvent.change(widthInput, { target: { value: '5' } });
  });

  expect(screen.queryByText(/The calculated area is:/i)).not.toBeInTheDocument();
});

test('renders area correctly on zero values in display logic', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i);
  const widthInput = screen.getByLabelText(/Width/i);
  
  fireEvent.change(heightInput, { target: { value: '0' } });
  fireEvent.change(widthInput, { target: { value: '5' } });

  expect(screen.getByText(/The calculated area is: 0/i)).toBeInTheDocument();
});

test('renders area correctly on extreme values in display logic', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i);
  const widthInput = screen.getByLabelText(/Width/i);
  
  fireEvent.change(heightInput, { target: { value: '1000000000' } });
  fireEvent.change(widthInput, { target: { value: '0.0000001' } });

  const expectedArea = (1000000000 * 0.0000001) / 2;

  expect(screen.getByText(`The calculated area is: ${expectedArea}`)).toBeInTheDocument();
});

test('renders area correctly on decimal inputs in display logic', () => {
  render(<TriangleAreaCalculator />);
  
  const heightInput = screen.getByLabelText(/Height/i);
  const widthInput = screen.getByLabelText(/Width/i);
  
  fireEvent.change(heightInput, { target: { value: '3.5' } });
  fireEvent.change(widthInput, { target: { value: '2' } });

  expect(screen.getByText(/The calculated area is: 3.5/i)).toBeInTheDocument();
});
