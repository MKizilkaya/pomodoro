import React from 'react'
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerSkipBackFilled } from "react-icons/tb";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { TbPlayerStopFilled } from "react-icons/tb";
import { MdReplay } from "react-icons/md";
import { TbPlayerPauseFilled } from "react-icons/tb";

const TimeControlPanel = () => {
    return (
        <div className='control-panel'>
            <MdReplay className='control-icon' />
            <TbPlayerSkipBackFilled className='control-icon' />
            <TbPlayerPlayFilled className='control-icon' />
            <TbPlayerPauseFilled className='control-icon' />
            <TbPlayerSkipForwardFilled className='control-icon' />
            <TbPlayerStopFilled className='control-icon' />
        </div>
    )
}

export default TimeControlPanel
