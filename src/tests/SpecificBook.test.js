import { render, fireEvent } from '@testing-library/react';
import SpecificBook from 'pages/specific-book/Specific-book';

describe('Testing count input change', () => {
  test('Count should increase when arrow up key is pressed', () => {
    const { getByTestId } = render(<SpecificBook />);
    const countInput = getByTestId('count-input');

    fireEvent.keyUp(countInput, { key: 'ArrowUp' });
    expect(countInput.value).toBe('2');
  });

  test('Count should decrease when arrow down key is pressed', () => {
    const { getByTestId } = render(<SpecificBook />);
    const countInput = getByTestId('count-input');

    fireEvent.change(countInput, { target: { value: '3' } });
    fireEvent.keyDown(countInput, { key: 'ArrowDown' });

    expect(countInput.value).toBe('2');
  });

  test('Should update total price when count is changed', () => {
    const { getByTestId } = render(<SpecificBook />);
    const countInput = getByTestId('count-input');

    fireEvent.change(countInput, { target: { value: '4' } });
    const totalPrice = getByTestId('total-price');

    expect(totalPrice).toHaveTextContent(/\$\d+(\.\d{2})?/);
  });
});
