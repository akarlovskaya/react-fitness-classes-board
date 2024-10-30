import React from 'react';


const SearchBar = () => {
  return (
    <section className="py-4 h-1/4">
        <form className="max-w-lg mx-auto">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative overflow-hidden">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                    type="search" 
                    id="default-search" 
                    className="block w-full p-4 ps-10 text-base text-gray-900 rounded-lg 
                    border-2 border-white" 
                    placeholder="Search by city, workout or instructor name..."
                    />
                <button 
                    type="submit" 
                    className="absolute end-0 bottom-0 inline-block text-white border-2 border-white  
                      rounded-lg bg-navy px-5 py-4 hover:bg-gray-700">
                        Search
                </button>
            </div>
        </form>
    </section>
  )
}

export default SearchBar;
