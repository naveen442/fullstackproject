const express=require('express');
const router=express.Router();
const {getGoals,setGoals,putGoals,deleteGoals}=require('../controllers/goalscontroller');

router.get('/',getGoals);
router.post('/',setGoals);
router.put('/:id',putGoals);
router.delete('/:id',deleteGoals);
        //(or)
    // router.route('/').get(getGoals).post(setGoals);
    // router.route('/:id').put(putGoals).delete(deleteGoals);
module.exports=router;