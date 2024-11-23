import { useState } from 'react';

type FilterBarProps = {
  filter: string;
  setFilter: (input: string) => void;
};

const FilterBar = ({ setFilter, filter }: FilterBarProps) => {
  const filters = ['All', 'Completed', 'Ai'];
  const [isSelected, setIsSelected] = useState(false);

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
      </div>
    </div>
  );
};

export default FilterBar;
