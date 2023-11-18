const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const asyncHandler=require('express-async-handler');
const User=require('../Model/userModel');

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error('please add all fields');
    }
    const userExists=await User.findOne({email:email});
    if(userExists){
        res.status(400);
        throw new Error('user already exists');
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const user=await User.create({
        name:name,
        email:email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            message:"user register sucessfully",
            // id:user._id, //(or) id:user.id
            id:user.id,
            name:user.name,
            email:user.email
        })
        //(or)
        // res.status(201).json({
        //     message:"user register sucessfully",
        //     user
        // })
    }
    else{
        res.status(400);
        throw new Error('Invalid user data');
    }
   
});

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:email});

    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            message:"login successfully",
            // id:user._id, //(or) id:user.id
            id:user.id,
            name:user.name,
            email:user.email,
            token:generateJWT(user.id)
        })
    }
    else{
res.status(400);
throw new Error('Invalid credentials');
    }
});

const getMe=asyncHandler(async(req,res)=>{
    const {id,name,email}=await User.findById(req.user.id);
    // (or)
    // const {_id,name,email}=await User.findById(req.user.id);
    // (or)
        // const {_id,name,email}=await User.findById(req.user);
    res.status(200).json({
        // id:_id,
        // (or)
        id:id,
        name:name,
        email:email 
    })
   
});

const generateJWT=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
}
module.exports={
    registerUser,
    loginUser,
    getMe
}