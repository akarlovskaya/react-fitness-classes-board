import React from 'react';

const Checkbox = ({id, value, name, handleSelect, children}) => {
  return (
    <div key={id} className="relative flex gap-x-3">
        <div className="flex h-6 items-center">
            <input 
                type="checkbox" 
                value={value} 
                id={id}
                name={name}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={handleSelect}/>
        </div>

        <div className="text-sm leading-6">
            <label 
                htmlFor={name} 
                className="font-medium text-gray-900">
                    {children}
            </label>
        </div>
    </div>
  )
}

export default Checkbox;
