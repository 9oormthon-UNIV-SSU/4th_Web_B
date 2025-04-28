import React, { useState } from 'react';
import TodoBoard from './component/TodoBoard';
import './app.css';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);
    const addItem = () => {
        setTodoList([...todoList, inputValue]);
    };

    return (
        <div className="container">
            <div className="input-div">
                <input type="text" className="todo-input" onChange={(e) => setInputValue(e.target.value)} />
                <button className="todo-button" onClick={addItem}>
                    추가
                </button>
            </div>

            <TodoBoard todoList={todoList} setTodoList={setTodoList} />
        </div>
    );
}

export default App;
