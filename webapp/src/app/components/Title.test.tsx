import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Title from './Title';

describe('Title component', () => {
  it('renders Title component with Title', () => {
    const { getByText } = render(<Title />);
    
    expect(getByText(/Task Title/i)).toBeVisible();
  });
})