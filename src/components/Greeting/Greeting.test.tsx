import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Greeting } from '@c/Greeting/Greeting';

describe('<Popups />', () => {
  test('it should mount', () => {
    render(<Greeting />);

    const popups = screen.getByTestId('Greeting');

    expect(popups).toBeInTheDocument();
  });
});
