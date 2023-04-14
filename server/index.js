const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv")
const mongoose = require('mongoose');
const { getTodo, addTodo, deleteTodo } = require('./Controller/todoController');

const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(cors());

// Api endpoint 

app.use("/getTodo", getTodo);
app.use("/addTodo",addTodo);
app.use("/deleteTodo/:id",deleteTodo)

/* Database Connection */

const PORT = process.env.PORT || 8088;

const Connect =()=>{
    return mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
}

app.listen(PORT, async ()=>{

    try {
        await Connect();
        console.log(`listing on port ${PORT}`)
    } catch (error) {
        console.log(error);
    }
})


