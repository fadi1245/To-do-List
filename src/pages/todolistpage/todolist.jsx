import React, { useState } from 'react';
import Menu from '../../components/menu';
import searchimage from '../../assets/magnifying-glass.png';
import Taskdetails from '../../components/taskdetails';
import { useTaskContext } from '../../context/context';

function Todolist() {
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to track search query
  const { tasks, loading, error } = useTaskContext(); // Access tasks and context state
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Track selected task ID

  // Handle task click to show task details
  const handleTaskClick = (id) => {
    setSelectedTaskId(id); 
    setShowTaskDetails(!showTaskDetails);
  };


  const handleSearch = (event) => {
    setSearchQuery(event.target.value); 
  };


  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex'>
      <div className="transition-all duration-300 ease-in-out w-[250px] sm:w-[250px] md:w-[300px] lg:w-[350px] bg-gray-900 h-[100vh]">
        <Menu />
      </div>
      <div className={`bg-slate-800 transition-all duration-300 ease-in-out ${showTaskDetails ? 'lg:w-[800px]' : 'w-[200px] sm:w-[210px] md:w-[350px] lg:w-[1200px] lg:pl-[150px] sm:pl-[5px]'}`}>

        <form className='w-[200px] sm:w-[200px] md:w-[300px] lg:w-[500px] mt-10'>
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Tasks"
              value={searchQuery}
              onChange={handleSearch} 
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <div>
          <a href="/addtask">
            <button className='rounded-md pt-3 pb-3 pl-8 pr-8 bg-blue-600 mt-10'>Add task</button>
          </a>
        </div>

        {loading ? (
          <p className="text-center mt-10">Loading tasks...</p>
        ) : error ? (
          <p className="text-center mt-10 text-red-500">Error: {error}</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              onClick={() => handleTaskClick(task._id)}
              className="flex justify-between w-[200px] mt-10 p-6 border-2 rounded-3xl sm:w-[200px] lg:w-[800px] md:w-[300px] cursor-pointer"
            >
              <h1 className="text-2xl">{task.title}</h1>
              <div className="flex gap-10">
                <p className="text-xl">{new Date(task.duedate).toLocaleDateString()}</p>
                <p>{task.status}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {showTaskDetails && selectedTaskId && (
        <div>
          <Taskdetails taskId={selectedTaskId} />
        </div>
      )}
    </div>
  );
}

export default Todolist;
