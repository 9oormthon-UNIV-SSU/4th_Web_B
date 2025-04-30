import React, { useState } from 'react';

function TodoItem({ item, index, todoList, setTodoList }) {
    const deleteItem = (index) => {
        console.log('Deleting item at index:', index);
        const newTodoList = todoList.filter((_, i) => i !== index);
        setTodoList(newTodoList);
        console.log(newTodoList);
    };
    return (
        <div className="todo_item" key={index}>
            {item}
            <button className="todo-delete" onClick={() => deleteItem(index)}>
                삭제
            </button>
        </div>
    );
}

export default TodoItem;
