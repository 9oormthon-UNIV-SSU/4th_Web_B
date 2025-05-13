import React, { useState } from 'react';
import InputForm from './InputForm';

function TodoItem({ item, index, todoList, setTodoList, onChange, onDelete }) {
    // //item 삭제
    // const deleteItem = (index) => {
    //     console.log('Deleting item at index:', index);
    //     const newTodoList = todoList.filter((_, i) => i !== index);
    //     setTodoList(newTodoList);
    //     console.log(newTodoList);
    // };

    const handleCheckbox = (checked) => {
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
