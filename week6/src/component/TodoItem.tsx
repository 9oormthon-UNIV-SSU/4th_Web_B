import React, { useState } from 'react';
import InputForm from './InputForm';
import { TodoItemProps } from '../types/types';

function TodoItem({ item, index, todoList, setTodoList, onChange, onDelete }: TodoItemProps) {
    const handleCheckbox = (checked: boolean) => {
        onChange(item.id, checked);
    };

    console.log(item);

    return (
        <div className="todo_item" key={index}>
            <InputForm checked={item.checked} onChange={handleCheckbox} />
            <p className={item.checked ? 'item_checked' : 'item'}>{item.text}</p>

            <button className="todo-delete" onClick={() => onDelete(item.id)}>
                삭제
            </button>
        </div>
    );
}

export default TodoItem;
