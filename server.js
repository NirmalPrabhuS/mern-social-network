const express = require('express');
const connectDB= require('./config/db');
const app= express();

//Connect to Database
connectDB();

//Init Middleware
app.use(express.json({extended:false}));

//Defining routes
app.use('/api/users',require('./routes/api/user'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));

app.get('/',(req,res)=>res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log('Server started on PORT', PORT));


