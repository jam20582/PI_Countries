import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render('Hello World');
  const text= screen.getByText('Hello World');
  expect(text).toBeInTheDocument();
});
