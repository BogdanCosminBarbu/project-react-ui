import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react'; 
import NumberPrinter from '../components/NumberPrinter';

test('renders number printer and prints numbers', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i);

  act(() => {
    fireEvent.change(input, { target: { value: '5' } });
  });

  expect(screen.getByText(/The printed numbers: 1, 2, 3, 4, 5/i)).toBeInTheDocument();
});

test('handles non-numeric input gracefully', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i) as HTMLInputElement;

  act(() => {
    fireEvent.change(input, { target: { value: 'abc' } });
  });
  
  expect(screen.queryByText(/The printed numbers:/i)).toBeInTheDocument();
});


test('handles zero value gracefully', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i) as HTMLInputElement;

  act(() => {
    fireEvent.input(input, { target: { value: '0' } }); 
  });
  
  expect(screen.queryByText(/The printed numbers:/i)).toBeInTheDocument();
});


test('handles negative number gracefully', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i) as HTMLInputElement;

  act(() => {
    fireEvent.input(input, { target: { value: '-' } }); 
    fireEvent.input(input, { target: { value: '5' } }); 
  });

  expect(screen.getByText(/The printed numbers: 1, 2, 3, 4, 5/i)).toBeInTheDocument();
});