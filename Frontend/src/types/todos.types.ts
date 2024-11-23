export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  createdAt: number;
  updatedAt: number | null;
}

export interface TodosContextType {
  todos: Todo[];
  addTodo: (title: string, category: string) => void;
  completeTodo: (id: string) => void;
  editTodo: (title: string, id: string) => void;
  deleteTodo: (id: string) => void;
}
