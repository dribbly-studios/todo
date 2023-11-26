'use client';
import React, {useState} from 'react';
import ToggleSwitch from "./util/ToggleSwitch";
import DateTimePicker from './util/DateTimePicker';

export default function Form() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [hasDueDate, setHasDueDate] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState<string>('');


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleToggle = () => {
        setHasDueDate((prevValue) => !prevValue);
    }

    const handleDateTimeChange = (dateTime: string) => {
        setSelectedDateTime(dateTime);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO after api is set up
        console.log('Form submitted:', { title, description, hasDueDate });
    };

    return(
        <form onSubmit={handleSubmit}>
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mb-6 block text-sm font-medium leading-6 text-gray-900">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Create a Task</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Add information relating to your task here</p>
                </div>
                <div className="mb-6 block text-sm font-medium leading-6 text-gray-900">
                    <label htmlFor="title">Title</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input 
                            type="text" 
                            name="title" 
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            className="block flex-1 border-0 bg-transparent px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                            placeholder="Study for exam"/>
                    </div>
                </div>
                <div className="mb-6 block text-sm font-medium leading-6 text-gray-900">
                    <label htmlFor="description">Description</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <textarea 
                            name="description" 
                            rows={3} id="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            className="block flex-1 border-0 bg-transparent px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                            placeholder="1hr for biology, 2hr for chemistry, 3hr for physics">
                        </textarea>
                    </div>
                </div>
                <div className="mb-6 flex justify-between text-sm font-medium leading-6 text-gray-900">
                    <label htmlFor="form-toggle-switch">Add a due date and time?</label>
                    <div>
                        <ToggleSwitch checked={hasDueDate} toggleSwitchName="form-toggle-switch" onChange={handleToggle}/>
                    </div>
                </div>
                {
                    hasDueDate && <DateTimePicker dateTimeString={selectedDateTime} onChange={handleDateTimeChange}/>
                }
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <div>
                    <button type="button" className="mr-4 text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                    </button>
                    </div>
                </div>
            </div>

        </form>
    )
}