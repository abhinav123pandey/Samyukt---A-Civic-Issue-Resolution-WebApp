const express=require('express');
const app=express();
const path=require('path');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
const cookieParser=require('cookie-parser');

//middleware
const isLoggedIn=require('./middlewares/isLoggedIn');

//database models
const userModel=require('./models/userModel');
const resolverModel = require('./models/resolverModel');

app.use(cookieParser());
//routes
const login=require('./routes/login');
const loginResolver=require('./routes/loginResolver');
const register=require('./routes/register');
const registerResolver=require('./routes/registeResolver');
const logout=require('./routes/logout');
const resolverDashboard=require('./routes/dashboardR');
const userDashboard=require('./routes/dashboardU');
//Databse connection and .ecv configuration 
dotenv.config();
connectDB(); 

app.set("view engine","ejs")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    res.render('index');
})

//Authentication and Autherization
app.use('/auth',login);
app.use('/auth',loginResolver);
app.use('/auth',register);
app.use('/auth',registerResolver);
app.use('/auth',logout);

//Resolver
app.use('/resolver',resolverDashboard);

app.get('/resolver/complaint-details',(req,res)=>{
    res.render('resolver/complaint-details');
})

app.get('/resolver/update-status',(req,res)=>{
    res.render('resolver/update-status');
})

//User
app.use('/user',userDashboard);

app.get('/user/createComplaint',(req,res)=>{
    res.render('user/createComplaint');
})
 
app.get('/user/trackComplaint',(req,res)=>{
    res.render('user/trackComplaint');
})

app.get('/user/complaint-details',(req,res)=>{
    res.render('user/complaint-details');
})

app.listen(process.env.PORT||5000,(err)=>{
    console.log(login);
    console.log("running on port",process.env.PORT);
})