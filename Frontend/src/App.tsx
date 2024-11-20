import './App.css';
import FilterBar from './components/FilterBar/FilterBar';
import TodoComponent from './components/Todo/TodoComponent';
import TodoForm from './components/TodoForm/TodoForm';
import { useAITaskOrdering } from './hooks/useAiTaskOrdering';
import { useTodos } from './hooks/useTodos';
import { Todo } from './types/todos.types';
import { useState } from 'react';

function App() {
  const [filter, setFilter] = useState<string>('All');
  const { todos } = useTodos();
  const { orderedTasks, getAIOrderedTasks } = useAITaskOrdering();

  let filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'Completed') {
      return todo.completed;
    } else {
      return todo;
    }
  });

  if (filter === 'Ai') {
    filteredTodos = orderedTasks || todos;
    getAIOrderedTasks(todos);
  }

  return (
    <div className='app'>
      <div className='app-container'>
        <header className='app-header'>
          <h1>My Todo List</h1>
          <p className='app-subtitle'>Stay organized and productive</p>
        </header>
        {/* Sidebar with OllamaTest */}

        <div className='app-grid'>
          {/* Main Content */}
          <div className='main-content'>
            <TodoForm />
            <FilterBar setFilter={setFilter} filter={filter} />
            {filteredTodos.length > 0 ? (
              <ul className='todo-list'>
                {filteredTodos.map((todo: Todo) => (
                  <TodoComponent
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    category={todo.category}
                    completed={todo.completed}
                    createdAt={todo.createdAt}
                  />
                ))}
              </ul>
            ) : (
              <div className='empty-state'>
                <p>No todos yet. Add one above!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
