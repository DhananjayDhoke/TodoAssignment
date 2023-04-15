
const Todo = require("../Model/todoSchema")

// API endpoints
 exports.getTodo = async (req, res) => {
    try {
       const todo = await Todo.find();
       return res.status(200).send(todo);
    } catch (error) {
        return res.status(500).send(error.message);
    }
  };

  exports.addTodo = async (req, res) => {
    try {
        const random = Math.round(Math.random()*1000)
        const newTodo =new Todo({ todo: req.body.todo});
         await newTodo.save()
       return res.status(200).send(newTodo);
         
    } catch (error) {
        return res.status(500).send(error.message); 
    }
  };
  
  exports.deleteTodo = async(req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id).lean().exec();
        
       return res.status(200).send({message:"sucsessfull deleted todo",
      todo});
    } catch (error) {
        return res.status(500).send(error.message); 
        
    }
  };