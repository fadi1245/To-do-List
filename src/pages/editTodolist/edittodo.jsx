import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../../context/context';
import axios from 'axios';
import backgroundImage from '../../assets/bg.jpg';
import { ToastContainer, toast } from 'react-toastify';

export default function Edittodo() {
  const { taskId } = useParams(); 
  const { tasks, fetchTasks } = useTaskContext(); 
  const [task, setTask] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    
    if (taskId && tasks.length > 0) {
      const selectedTask = tasks.find(task => task._id === taskId);
      setTask(selectedTask);
    }
  }, [taskId, tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await axios.put(`http://localhost:8000/task/edittask/${taskId}`, task);
      toast.success('Task updated successfully');
      fetchTasks(); 
      navigate('/'); 
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task');
    }
  };

  if (!task) {
    return <div>Loading task details...</div>;
  }

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center h-screen w-full text-black text-2xl flex justify-center items-center"
    >
      <ToastContainer/>
      <div className="border-8 border-black rounded-lg pt-10 text-center w-[1000px] h-[650px] bg-white bg-opacity-80">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="block w-[300px] mx-auto my-2 bg-slate-200 border rounded-lg pl-4 pr-4"
          />
          <br />
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            id="desc"
            value={task.desc}
            onChange={(e) => setTask({ ...task, desc: e.target.value })}
            className="block w-1/2 mx-auto my-2 bg-slate-200 border rounded-lg pl-4 pr-4 pt-2 h-[120px] resize-none"
          ></textarea>
          <br />
          <label htmlFor="duedate">Due date</label>
          <input
            type="date"
            name="duedate"
            value={task.duedate}
            onChange={(e) => setTask({ ...task, duedate: e.target.value })}
            className="block mx-auto my-2 bg-slate-200 border rounded-lg pl-4 pr-4"
          />
          <br />
          <select
            name="status"
            className="block w-[300px] mx-auto my-2 bg-slate-200 border rounded-lg pl-4 pr-4"
          >
            <option value="" disabled selected>
              Select Status
            </option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <br />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Edit Task
          </button>
        </form>
      </div>
    </div>
  );
}
