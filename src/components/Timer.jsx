import React, { useEffect, useState } from 'react';

const Timer = ({ tasks, onTaskComplete }) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            startTask(tasks[currentTaskIndex]);
            setIsRunning(true);
        }
    }, [tasks, currentTaskIndex]);

    const startTask = (task) => {
        const minutes = parseInt(task.minute) || 0;
        const seconds = parseInt(task.second) || 0;
        setTimeLeft({ minutes, seconds });
    };

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                let { minutes, seconds } = prevTime;

                if (seconds > 0) {
                    return { minutes, seconds: seconds - 1 };
                } else if (minutes > 0 && seconds === 0) {
                    return { minutes: minutes - 1, seconds: 59 };
                } else if (minutes === 0 && seconds === 0) {
                    if (currentTaskIndex < tasks.length - 1) {
                        setCurrentTaskIndex(currentTaskIndex + 1);
                        startTask(tasks[currentTaskIndex + 1]);
                        onTaskComplete(currentTaskIndex); // Notify progress update
                    } else {
                        setIsRunning(false); // Tüm görevler bittiğinde zamanlayıcıyı durdur
                    }
                    return { minutes: 0, seconds: 0 };
                }
                return prevTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, timeLeft, currentTaskIndex, tasks, onTaskComplete]);

    return (
        <div className='timer'>
            <p>{tasks[currentTaskIndex]?.taskName || 'No task available'}</p>
            <p>
                {timeLeft.minutes.toString().padStart(2, '0')}:
                {timeLeft.seconds.toString().padStart(2, '0')}
            </p>
        </div>
    );
};

export default Timer;
