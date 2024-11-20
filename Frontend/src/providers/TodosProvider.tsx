// providers/TodosProvider.tsx
import { useState, ReactNode, useEffect } from 'react';
import { TodosContext } from '../context/TodosContext';
import { Todo } from '../types/todos.types';

interface TodosProviderProps {
  children: ReactNode;
}

export const TodosProvider = ({ children }: TodosProviderProps) => {
  // Initialize state with a function to avoid unnecessary re-renders
  const [todos, setTodos] = useState<Todo[]>(() => {
    // This runs only on initial render
    const savedTodos = localStorage.getItem('todos');
    try {
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error('Error parsing todos from localStorage:', error);
      return [];
    }
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
      console.log('Todos saved successfully');
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (title: string, category: string) => {
    setTodos((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        category,
        completed: false,
        createdAt: Date.now(),
        updatedAt: null,
      },
      ...prev,
    ]);

    console.log('Todo Added:', { title, category });
  };

  const editTodo = (title: string, id: string) => {
    setTodos((prev) => {
      const editedTodos = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title };
        }
        return todo;
      });
      return editedTodos;
    });
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  const completeTodo = (id: string) => {
    setTodos((prev) => {
      const updatedTodos = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return updatedTodos;
    });
  };

  const value = {
    setTodos,
    todos,
    addTodo,
    completeTodo,
    editTodo,
    deleteTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
