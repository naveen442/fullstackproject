const express=require('express');
const router=express.Router();
const {getGoals,setGoals,putGoals,deleteGoals}=require('../controllers/goalscontroller');
const {protect}=require('../Middleware/authMiddleware');
router.get('/',protect,getGoals);
router.post('/',protect,setGoals);
router.put('/:id',protect,putGoals);
router.delete('/:id',protect,deleteGoals);
        //(or)
    // router.route('/').get(getGoals).post(setGoals);
    // router.route('/:id').put(putGoals).delete(deleteGoals);
module.exports=router;