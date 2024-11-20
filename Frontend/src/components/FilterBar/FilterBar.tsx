import { useState } from 'react';
import { useAITaskOrdering } from '../../hooks/useAiTaskOrdering';
import { useTodos } from '../../hooks/useTodos';

type FilterBarProps = {
  filter: string;
  setFilter: (input: string) => void;
};

const FilterBar = ({ setFilter, filter }: FilterBarProps) => {
  const filters = ['All', 'Completed'];
  const [isSelected, setIsSelected] = useState(false);
  const { orderedTasks, getAIOrderedTasks } = useAITaskOrdering();
  const { todos, setTodos } = useTodos();

  const toggleSelected = () => setIsSelected(!isSelected);

  return (
    <div className='filter-panel'>
      <h2 className='filter-title'>Filter Options</h2>
      <div className='filter-options'>
        {filters.map((currFilter) => (
          <button
            key={currFilter}
            className={`button ${filter === currFilter ? 'selected' : ''}`}
            onClick={() => {
              toggleSelected();
              setFilter(currFilter);
            }}
          >
            {currFilter}
          </button>
        ))}
        <button
          onClick={() => {
            console.log(orderedTasks);
            getAIOrderedTasks(todos);
            if (orderedTasks.length > 0) {
              setTodos(orderedTasks);
            }
          }}
        >
          AI
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
