import React, { useState,useEffect } from 'react';
import { deleteGoal} from '../features/goals/goalSlice';
import { updateGoal,} from '../features/goals/goalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getGoal, reset } from '../features/goals/goalSlice';
import { useNavigate } from 'react-router-dom';

const GoalItem = ({goal}) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { goals } = useSelector(
    (state) => state.goals
  );
  const currentGoal = goals.find((g) => g._id === goal._id);

  // Initialize the update state with the text of the current goal
  const [update, setUpdate] = useState(currentGoal.text);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have access to the goal ID and new tag data
      await dispatch(updateGoal({ id: goal._id, updatedGoal: { text: update } }));
      // Clear the input or perform any other necessary actions after a successful update
      setUpdate('');
      navigate('/')
     
    } catch (error) {
      console.error('Error updating goal:', error);
      // Handle error, if needed
    }
  };

  // useEffect(() => {
  //   if (currentGoal.text !== update) {
  //     // The update has occurred, so navigate back to the home page
  //     navigate('/');
  //   }
  //   dispatch(getGoal());
  // }, [navigate, currentGoal.text, update, dispatch]);
  // useEffect(() => {
  //   dispatch(getGoal());
  //   // return () => dispatch(reset());
  // }, [dispatch]);
  return (
       <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h3>{goal.text}</h3>
      <input
        type="text"
        value={update}
        onChange={(e) => setUpdate(e.target.value)}
        placeholder="Enter new text"
      />
      <button onClick={handleUpdate} className="update-tag">
        Update
      </button>
      <button onClick={() =>dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
     
    </div>
  )
}

export default GoalItem

