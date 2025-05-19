import React from "react";

interface FilterButtonProps {
  filter: 'all' | 'done' | 'undone';
  setFilter: (filter: 'all' | 'done' | 'undone') => void;
}

function FilterButton({ filter, setFilter }: FilterButtonProps) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          전체
        </button>
        <button
          className={filter === 'done' ? 'active' : ''}
          onClick={() => setFilter('done')}
        >
          완료
        </button>
        <button
          className={filter === 'undone' ? 'active' : ''}
          onClick={() => setFilter('undone')}
        >
          미완료
        </button>
      </div>
    );
  }
  export default FilterButton;