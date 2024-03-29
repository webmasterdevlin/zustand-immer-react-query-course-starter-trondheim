import { render, screen } from '../../test-utils/testing-library-utils';
import HomePage from '../HomePage';

// component testing
describe('Home page', () => {
  it('should render the welcome message', () => {
    render(<HomePage />);

    const welcomeBack = screen.getByTestId('welcome-message');
    expect(welcomeBack).toHaveTextContent(/welcome/i);
    expect(welcomeBack).toHaveClass('dark:text-white');
  });

  it('welcome message should be white text', () => {
    render(<HomePage />);

    const welcomeBack = screen.getByTestId('welcome-message');
    expect(welcomeBack).toHaveClass('dark:text-white');
  });
});
