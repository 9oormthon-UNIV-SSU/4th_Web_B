import React from 'react';
import TodoItem from './TodoItem';

function TodoBoard({ todoList, setTodoList }) {
    return (
        <div>
            <h1 className="todo-title">Todo List</h1>
            {todoList.map((item, index) => (
                <TodoItem key={index} item={item} index={index} todoList={todoList} setTodoList={setTodoList} />
            ))}
        </div>
    );
}

export default TodoBoard;
