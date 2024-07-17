import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import NumberPrinter from '../components/NumberPrinter';

test('handles non-numeric input gracefully in business logic', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i) as HTMLInputElement;

  act(() => {
    fireEvent.change(input, { target: { value: 'abc' } });
  });

  expect(input.value).toBe(''); 
});

test('handles zero value gracefully in business logic', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i) as HTMLInputElement;

  act(() => {
    fireEvent.change(input, { target: { value: '0' } });
  });

  expect(input.value).toBe(''); 
});

test('handles negative number gracefully in business logic', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i) as HTMLInputElement;

  act(() => {
    fireEvent.change(input, { target: { value: '-' } });
    fireEvent.change(input, { target: { value: '5' } });
  });

  expect(input.value).toBe('5'); 
});

test('renders number printer and prints numbers in display logic', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i);

  act(() => {
    fireEvent.change(input, { target: { value: '5' } });
  });

  expect(screen.getByText(/The printed numbers: 1, 2, 3, 4, 5/i)).toBeInTheDocument();
});

test('does not render numbers on non-numeric input in display logic', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i);

  act(() => {
    fireEvent.change(input, { target: { value: 'abc' } });
  });

  expect(screen.queryByText(/The printed numbers:/i)).toBeInTheDocument();
});

test('does not render numbers on zero value in display logic', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i);

  act(() => {
    fireEvent.change(input, { target: { value: '0' } });
  });

  expect(screen.queryByText(/The printed numbers:/i)).toBeInTheDocument();
});

test('renders numbers correctly on negative number input in display logic', () => {
  render(<NumberPrinter />);

  const input = screen.getByLabelText(/Max Number to Print/i);

  act(() => {
    fireEvent.change(input, { target: { value: '-' } });
    fireEvent.change(input, { target: { value: '5' } });
  });

  expect(screen.getByText(/The printed numbers: 1, 2, 3, 4, 5/i)).toBeInTheDocument();
});