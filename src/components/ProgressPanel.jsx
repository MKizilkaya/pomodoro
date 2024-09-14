import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ProgressPanel = ({ tasks, currentTaskIndex }) => {
    const [taskStatus, setTaskStatus] = useState([]);

    useEffect(() => {
        if (tasks.length > 0) {
            setTaskStatus(new Array(tasks.length).fill('not-completed'));
        }
    }, [tasks]);

    useEffect(() => {
        if (tasks.length > 0) {
            setTaskStatus(prevStatus => {
                const updatedStatus = [...prevStatus];
                if (currentTaskIndex !== null) {
                    // Önceki görevleri tamamlanmış olarak işaretle
                    for (let i = 0; i < currentTaskIndex; i++) {
                        updatedStatus[i] = 'completed';
                    }
                    // Şu anki görevi 'not-completed' olarak işaretle
                    updatedStatus[currentTaskIndex] = 'not-completed';
                }
                return updatedStatus;
            });
        }
    }, [currentTaskIndex, tasks]);

    useEffect(() => {
        if (tasks.length > 0 && currentTaskIndex !== null) {
            setTaskStatus(prevStatus => {
                const updatedStatus = [...prevStatus];
                if (currentTaskIndex < tasks.length) {
                    updatedStatus[currentTaskIndex] = 'completed';
                }
                return updatedStatus;
            });
        }
    }, [currentTaskIndex, tasks]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle className='status-icon completed' />;
            case 'not-completed':
                return <FaTimesCircle className='status-icon not-completed' />;
            default:
                return null;
        }
    };

    return (
        <div className='progress-panel'>
            <h3>Görevler</h3>
            {tasks.length === 0 ? (
                <p>Aktif görev yok</p>
            ) : (
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} className={index === currentTaskIndex ? 'active-task' : ''}>
                            {task.taskName} - {task.minute || 0} dakika, {task.second || 0} saniye
                            {getStatusIcon(taskStatus[index])}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProgressPanel;
