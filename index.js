const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();



const userRoutes = require('./routes/user'); //Routes


mongoose.connect('mongodb+srv://admin-dennis:test123@thinkmachine.vtq6n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser:true})

app.use(morgan('dev')); //for logging of request

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/',userRoutes); //Routes




//handling any error that is not on the routes

app.use((req,res,next)=>{ 
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})


app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json ({
        err:{
            message:err.message
        }
    })
})

//end of handling error

//create server

app.listen(process.env.PORT || 3001, ()=>{
    console.log("Server is running");
})

//