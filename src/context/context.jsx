import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const fetchTasks = async () => {
        setLoading(true); 
        try {
            const response = await axios.get('http://localhost:8000/task/gettasks');
            setTasks(response.data.tasks); 
            setError(null);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError(err.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const value = {tasks,loading,error,fetchTasks,};

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext=() => React.useContext(TaskContext);
