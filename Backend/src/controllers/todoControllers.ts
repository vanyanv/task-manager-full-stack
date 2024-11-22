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

//get a single todo
export const getTodo = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: 'Error getting Todo' });
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
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { ...update, updatedAt: Date.now() },
      { new: true }
    );

    if (!todo) {
      res.status(401).json({ message: 'Could not update Todo, was not found' });
    }

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error Updating Todo' });
  }
};

//delete
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id });

    if (!todo) {
      res.status(404).json({ message: 'Could not find and delete Todo' });
    }

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error Deleting Todo' });
  }
};
