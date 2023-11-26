import React from 'react';

type DateTimePickerProps = {
  dateTimeString: string;
  onChange: (dateTime: string) => void;
};

const DateTimePicker = ({dateTimeString, onChange}: DateTimePickerProps) => {
  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="space-y-4">
      <label htmlFor="datetime" className="block text-sm font-medium text-gray-900">
        Select Date and Time
      </label>
      <input
        type="datetime-local"
        id="datetime"
        name="datetime"
        value={dateTimeString}
        onChange={handleDateTimeChange}
        className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 placeholder:text-gray-400"
      />
    </div>
  );
};

export default DateTimePicker;
