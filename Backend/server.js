const express=require('express');
const dotenv=require('dotenv').config();
const colors=require('colors'); 
const {errorHandler}=require('../Backend/Middleware/errorMiddleware');
const connectDB=require('./config/db');
connectDB();
const port=process.env.PORT || 5000;

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/goals',require('./Routes/goalRoutes'));
app.use('/api/users',require('./Routes/userRoutes'));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})