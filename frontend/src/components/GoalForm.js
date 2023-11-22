import React from 'react'
import { useState } from 'react';
import {useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';
const GoalForm = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const onsubmit=(e)=>{
        e.preventDefault();
        dispatch(createGoal(text));
        setText('');
    }
  return (
    <div className='form'>
     <form onSubmit={onsubmit}>
     <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Add Goal</button>
        </div>
     </form>
    </div>
  )
}

export default GoalForm;

