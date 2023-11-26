import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Task from './Task';

describe('Task component', () => {
  it('renders Task component with Title', () => {
    const { getByText } = render(<Task />);
    
    expect(getByText(/Task Title/i)).toBeVisible();
  });
})