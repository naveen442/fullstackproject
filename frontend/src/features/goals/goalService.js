import axios from 'axios';

const API_URL='/api/goals/';


const createGoal=async(goalData,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    const response=await axios.post(API_URL,{text:goalData},config);
    return response.data
}
const getGoal=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    const response=await axios.get(API_URL,config);
    return response.data
}
const deleteGoal=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    const response=await axios.delete(API_URL + id,config);
    return response.data
}
const updateGoal = async (id, updatedGoal, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
      const response = await axios.put(API_URL + id, updatedGoal, config);
      return response.data;
  };
const goalService = {
    createGoal,
    getGoal,
    deleteGoal,
    updateGoal
  };
  export default goalService;