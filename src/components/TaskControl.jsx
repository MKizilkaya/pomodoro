import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import TaskControlPanel from './TaskControlPanel';
import { RiCloseLargeLine } from "react-icons/ri";

const TaskControl = ({ onSave }) => { // onSave fonksiyonunu prop olarak alıyoruz

    const [isTaskControlVisible, setTaskControlVisible] = useState(false);

    const toggleTaskControl = () => {
        setTaskControlVisible(!isTaskControlVisible);
    };

    return (
        <div>
            {!isTaskControlVisible ?
                <GiHamburgerMenu className='task-control-icon' onClick={toggleTaskControl} /> :
                <RiCloseLargeLine className='task-control-icon' onClick={toggleTaskControl} />
            }

            {isTaskControlVisible && (
                <div className='task-control-panel'>
                    {/* TaskControlPanel bileşenine onSave fonksiyonunu geçiyoruz */}
                    <TaskControlPanel onSave={onSave} />
                </div>
            )}
        </div>
    );
}

export default TaskControl;
