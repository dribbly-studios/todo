import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import DateTimePicker from './DateTimePicker';

const dateTimeString = '2023-12-01T12:00';
const onChangeMock = jest.fn();

describe('DateTimePicker component', () => {
  it('renders correctly', () => {
    render(<DateTimePicker dateTimeString={dateTimeString} onChange={onChangeMock} />);

    expect(screen.getByLabelText(/Select Date and Time/i)).toBeVisible();
    expect(screen.getByLabelText(/Select Date and Time/i)).toHaveValue(dateTimeString);
  });

  it('renders new datetime on change', () => {
    render(<DateTimePicker dateTimeString={dateTimeString} onChange={onChangeMock} />);

    const newDateTime = '2023-12-01T15:30';
    fireEvent.change(screen.getByLabelText(/Select Date and Time/i), { target: { value: newDateTime } });

    expect(onChangeMock).toHaveBeenCalledWith(newDateTime);
  });
});