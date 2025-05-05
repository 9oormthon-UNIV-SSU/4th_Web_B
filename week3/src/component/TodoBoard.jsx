import React from 'react';
import TodoItem from './TodoItem';
import Header from './Header';

function TodoBoard({ todoList, setTodoList, onChange }) {
    console.log(todoList);
    return (
        <div>
            <div className="items-container">
                {todoList.length > 0 ? (
                    todoList.map((item) => (
                        <TodoItem
                            key={item.id}
                            item={item}
                            todoList={todoList}
                            setTodoList={setTodoList}
                            onChange={onChange}
                        />
                    ))
                ) : (
                    <p>할 일이 없습니다!</p>
                )}
            </div>
        </div>
    );
}

export default TodoBoard;
