const asyncHandler=require('express-async-handler');
const Goal=require('../Model/goalModel');
const User=require('../Model/userModel');
const getGoals=asyncHandler(async(req,res)=>{
    const goals=await Goal.find({user:req.user.id});
    res.status(200).json(goals);
});
const setGoals=asyncHandler(async(req,res)=>{
    if(!req.body.text){
        // res.status(400).json({
        //     errorMessage:"Empty text message"
        // })
        res.status(400)
         throw new Error('plz enter text field');
    }
    const goal=await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(201).json(goal);
});
const putGoals=asyncHandler(async(req,res)=>{

    const goal=await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error('goal not found')
    }
    const user=await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('user not found');
    }
    if(goal.user.toString() !=user.id){
        res.status(401);
        throw new Error('user not authorized');
    }
    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedGoal);
});
const deleteGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error('goal not found')
    }
    const user=await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('user not found');
    }
    if(goal.user.toString() !=user.id){
        res.status(401);
        throw new Error('user not authorized');
    }
    await Goal.deleteOne({ _id: req.params.id });
    //(or)
    // await Goal.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({message: 'Goal deleted successfully',id:req.params.id});
});

module.exports={
    getGoals,
    setGoals,
    putGoals,
    deleteGoals
}