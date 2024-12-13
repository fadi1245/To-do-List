import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../context/context'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function Taskdetails({ taskId }) {
  const { tasks,fetchTasks } = useTaskContext(); 
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (taskId && tasks.length > 0) {
      const selectedTask = tasks.find(task => task._id === taskId);
      setTask(selectedTask);
    }
  }, [taskId, tasks]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/task/deletetask/${task._id}`);
      alert('Task deleted successfully');
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task');
    }
  };

  if (!task) {
    return <div>Loading task details...</div>;
  }

  return (
    <div className='w-[390px] bg-orange-500 h-[100vh] pl-5'>
      <ToastContainer/>
      <h1 className='text-5xl pt-10 pl-3'>{task.title}</h1>
      <h1 className='mt-5 text-xl'>Due Date: {new Date(task.duedate).toLocaleDateString()}</h1>
      <h1 className='mt-5 text-xl'>Created At: {new Date(task.createdAt).toLocaleDateString()}</h1>
      <p className='mt-10 text-2xl'>{task.desc}</p>
      <p className='pb-10 pt-10'>Status: {task.status}</p>
      <div className='flex justify-evenly'>
      <Link to={`/edit/${task._id}`}>
          <button className='rounded-md pt-3 pb-3 pl-8 pr-8 bg-blue-600'>Edit</button>
        </Link>
        <button onClick={handleDelete} className='rounded-md pt-3 pb-3 pl-8 pr-8 bg-red-600'>Delete</button>
      </div>
    </div>
  );
}

export default Taskdetails;
