import React, { useState } from 'react';
import backgroundImage from '../../assets/bg.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Addtodo() {
  const [task,settask]=useState({})

  const handlechange=(e)=>{
    settask({...task,[e.target.name]:e.target.value})
  }

  const handlesubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:8000/task/addtask',task).then(res=>{
        toast.success("task added")
    })
    .catch(err=>{
      toast.error("task adding failed")
    })
  }
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center h-screen w-full text-black text-2xl flex justify-center items-center"
    >
      <ToastContainer />
      <div className="border-8 border-black rounded-lg pt-10 text-center w-[1000px] h-[650px] bg-white bg-opacity-80">
        <form onSubmit={handlesubmit} method='post'>
          <label htmlFor="">Title</label>
          <input type="text" name="title" className="block w-[300px] mx-auto my-2  bg-slate-200 border rounded-lg pl-4 pr-4"
          placeholder="Write your Title here..." onChange={handlechange} />
          <br />
          <label htmlFor="">Description</label>
          <textarea
            name="desc"
            id="desc"
            className="block w-1/2 mx-auto my-2 bg-slate-200 border rounded-lg pl-4 pr-4 pt-2 h-[120px] resize-none"
            placeholder="Write your description here..." onChange={handlechange}>
                </textarea>        
              <br />
          <label htmlFor="">Due date</label>
          <input type="date" name="duedate" id="" className="block  mx-auto my-2 bg-slate-200 border rounded-lg pl-4 pr-4" onChange={handlechange} />
          <br />
          <select
            name="status"
            className="block w-[300px] mx-auto my-2 bg-slate-200 border rounded-lg pl-4 pr-4"
            onChange={handlechange}
          >
            <option value="" disabled selected>
              Select Status
            </option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <br />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type='submit'>Add</button>
        </form>
      </div>
    </div>
  );
}

export default Addtodo;
