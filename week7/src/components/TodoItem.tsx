import React from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  item: Todo;
  index: number;
  onToggle: (index: number) => void;
  onDelete: (index: number) => void;
}

function TodoItem({ item, index, onToggle, onDelete }: TodoItemProps) {
    return (
      <div className="todo-item">
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => onToggle(index)}
        />
        <span
          style={{
            textDecoration: item.done ? 'line-through' : 'none',
            marginLeft: '10px',
          }}
        >
          {item.text}
        </span>
        <button onClick={() => onDelete(index)}>삭제</button>
      </div>
    );
  }
  export default TodoItem;
  