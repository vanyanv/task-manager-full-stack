import { Request, Response } from 'express';
import Todo from '../models/Todo';

//get all todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const toDo = await Todo.find();

    res.status(201).json(toDo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Todos' });
  }
};

//create a todos
export const createTodo = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { title, description } = req.body;

    if (!title) {
      res.status(401).json({ message: 'Title is required to create a Todo' });
    }
    const todo = new Todo({
      title,
      description,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Todos' });
  }
};


//update a todo
export const updateTodo = async (req: Request, res:Response){
    try{

    }catch(error){

    }
}

//delete
export const deleteTodo = async (req: Request, res: Response){
 try{

    }catch(error){
        
    }
}