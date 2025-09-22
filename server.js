//import express module
const express=require('express');
const mongoose=require('mongoose');
const app = require('./app');


require('dotenv').config();
//create an express apllication



mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connect to MongoDB");
    app.listen(3000,()=>{
    console.log(`server is running on http://localhost:3000`)
});


})
.catch((err)=>console.log("could not connext"))