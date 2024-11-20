import { createContext } from 'react';
import { TodosContextType } from '../types/todos.types';

export const TodosContext = createContext<TodosContextType | null>(null);
