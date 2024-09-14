import React, { useState } from 'react';
import Timer from './Timer';
import ProgressPanel from './ProgressPanel';
import TaskControl from './TaskControl';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

    const handleTasksSave = (savedTasks) => {
        setTasks(savedTasks);
        setCurrentTaskIndex(0); // İlk görevi başlat
    };

    const handleTaskComplete = (completedTaskIndex) => {
        setCurrentTaskIndex(completedTaskIndex + 1); // Bir sonraki göreve geç
    };

    return (
        <div className='container'>
            <div className='left-container'>
                <TaskControl onSave={handleTasksSave} />
            </div>
            <div className='middle-container'>
                <Timer tasks={tasks} onTaskComplete={handleTaskComplete} />
            </div>
            <div className='right-container'>
                <ProgressPanel tasks={tasks} currentTaskIndex={currentTaskIndex} />
            </div>
        </div>
    );
};

export default Home;
