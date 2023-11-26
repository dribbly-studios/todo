import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import ToggleSwitch from './ToggleSwitch';

const onChangeMock = jest.fn();

describe('ToggleSwitch component', () => {
  it('renders correctly with unchecked state', () => {
    render(<ToggleSwitch checked={false} onChange={onChangeMock} />);

    const toggleSwitch = screen.getByRole('switch');
    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).not.toBeChecked();

    fireEvent.click(toggleSwitch);

    expect(onChangeMock).toHaveBeenCalledWith(true);
  });

  it('renders correctly with checked state', () => {
    render(<ToggleSwitch checked={true} onChange={onChangeMock} />);

    const toggleSwitch = screen.getByRole('switch');
    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).toBeChecked();

    fireEvent.click(toggleSwitch);

    expect(onChangeMock).toHaveBeenCalledWith(false);
  });
});
