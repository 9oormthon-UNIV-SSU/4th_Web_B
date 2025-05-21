import TodoItem from './TodoItem';
import { Todo } from '../types';
import React from 'react';

interface TodoBoardProps {
  todoList: Todo[];
  onToggle: (index: number) => void;
  onDelete: (index: number) => void;
}

function TodoBoard({ todoList, onToggle, onDelete }: TodoBoardProps) {
  return (
    <>
      {todoList.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
export default TodoBoard;
