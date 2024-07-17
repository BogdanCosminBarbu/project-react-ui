import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react'; 
import NumberPrinter from '../components/NumberPrinter';

test('renders number printer and prints numbers', () => {
  render(<NumberPrinter />);
  
  const input = screen.getByLabelText(/max number to print/i);
  
  act(() => {
    fireEvent.change(input, { target: { value: '5' } });
  });

  expect(screen.getByText(/The printed numbers: 1, 2, 3, 4, 5/i)).toBeInTheDocument();
});
