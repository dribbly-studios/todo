import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Form from './Form';

describe('Form component', () => {
  it('renders correctly', () => {
    render(<Form />);
    expect(screen.getByText(/Create a Task/i)).toBeVisible();
    expect(screen.getByLabelText(/Title/i)).toBeVisible();
    expect(screen.getByLabelText(/Description/i)).toBeVisible();
    expect(screen.getByLabelText(/Add a due date and time\?/i)).toBeVisible();
    expect(screen.queryByText(/Select Date and Time/i)).toBeNull();
  });

  it('handles title input change', () => {
    render(<Form />);
   const titleInput = screen.getByPlaceholderText('Study for exam');

   fireEvent.change(titleInput, { target: { value: 'New title' } });
   
   expect(titleInput).toHaveValue('New title');
  });

  it('handles description input change', () => {
    render(<Form />);
     const descriptionTextarea = screen.getByPlaceholderText('1hr for biology, 2hr for chemistry, 3hr for physics');
    
     fireEvent.change(descriptionTextarea, { target: { value: 'New description' } });
     
     expect(descriptionTextarea).toHaveValue('New description');
  });

  it('handles toggle switch change', () => {
    render(<Form />);
    const toggleSwitchInput = screen.getByRole('switch', { name: /Add a due date and time\?/i });
    expect(screen.queryByText(/Select Date and Time/i)).toBeNull();

    fireEvent.click(toggleSwitchInput);
     
    expect(toggleSwitchInput).toBeChecked();
    expect(screen.getByLabelText(/Select Date and Time/i)).toBeVisible();
  });
});
