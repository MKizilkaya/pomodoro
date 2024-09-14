import React, { useState, useEffect } from 'react';

const TaskControlPanel = ({ onSave }) => {
    const [taskName, setTaskName] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');
    const [taskStack, setTaskStack] = useState([]);
    const [error, setError] = useState('');

    // Bileşen ilk yüklendiğinde localStorage'den görevleri yükleyin
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('taskStack'));
        if (savedTasks) {
            setTaskStack(savedTasks);
        }
    }, []);

    // Görev eklendiğinde veya silindiğinde görevleri localStorage'e kaydedin
    useEffect(() => {
        localStorage.setItem('taskStack', JSON.stringify(taskStack));
    }, [taskStack]);

    const handleAddTask = () => {
        if (minute < 0 || second < 0) {
            setError('Dakika ve saniye negatif olamaz!');
            return;
        }

        if (!taskName) {
            setError('Görev adı zorunludur!');
            return;
        }

        if (minute === '' && second === '') {
            setError('Dakika veya saniyeden en az biri girilmelidir!');
            return;
        }

        setError('');
        setTaskStack([...taskStack, { taskName, minute, second }]);
        setTaskName('');
        setMinute('');
        setSecond('');
    };

    const handleSave = () => {
        if (taskStack.length > 0) {
            if (typeof onSave === 'function') {
                onSave(taskStack); // Görevleri Home bileşenine gönder
            } else {
                console.error('onSave prop is not a function');
            }
        }
    };

    const handleDeleteTask = (index) => {
        const updatedStack = taskStack.filter((_, i) => i !== index);
        setTaskStack(updatedStack);
    };

    return (
        <div className='task-control-panel'>
            <div className='input-panel'>
                <div >
                    <input className='input-name' type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='Görev Adı Giriniz...' />
                </div>
                <div className='input-time'>
                    <div>
                        <input
                            onChange={(e) => setMinute(e.target.value)}
                            min="0" className='input-mins' type="number" value={minute} />
                        <span className="input-text">min</span>
                    </div>:
                    <div>
                        <input
                            onChange={(e) => setSecond(e.target.value)}
                            min="0" className='input-secs' type="number" value={second} />
                        <span className="input-text">sec</span>
                    </div>
                </div>
                <button onClick={handleAddTask}>Görev Ekle</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <h3>Görev Listesi</h3>
                    <ul>
                        {taskStack.map((task, index) => (
                            <li key={index}>
                                {task.taskName} - {task.minute.toString().padStart(2, '0') || 0}:{task.second.toString().padStart(2, '0') || 0}
                                <button onClick={() => handleDeleteTask(index)}>Sil</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {taskStack.length > 0 && (
                <div>
                    <button onClick={handleSave}>Başla</button>
                </div>
            )}
        </div>
    );
};

export default TaskControlPanel;
