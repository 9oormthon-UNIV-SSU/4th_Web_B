import { useState } from 'react';
import TodoBoard from './component/TodoBoard';
import './App.css';
import Header from './component/Header';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [filter, setFilter] = useState('all');

    const addItem = () => {
        if (!inputValue.trim()) return;
        const newItem = {
            id: Date.now(),
            text: inputValue,
            checked: false,
            done: false,
        };
        setTodoList([...todoList, newItem]);
        setInputValue('');
    };

    //checked 변경
    const handleCheckChange = (id, newChecked) => {
        const newList = todoList.map((todo) =>
            todo.id === id
                ? { ...todo, checked: newChecked, done: newChecked } // checked = done
                : todo
        );
        setTodoList(newList);
    };

    //필터링된 리스트
    const filteredList = todoList.filter((todo) => {
        if (filter === 'done') return todo.done;
        if (filter === 'undone') return !todo.done;
        return true;
    });

    return (
        <div className="container">
            <Header />
            <div className="input-div">
                <input type="text" className="todo-input" onChange={(e) => setInputValue(e.target.value)} />
                <button className="todo-button" onClick={addItem}>
                    추가
                </button>
            </div>

            <div className="filter-buttons">
                <button
                    className={filter === 'all' ? 'filter-button-active' : 'filter-button'}
                    onClick={() => setFilter('all')}
                >
                    전체
                </button>
                <button
                    className={filter === 'done' ? 'filter-button-active' : 'filter-button'}
                    onClick={() => setFilter('done')}
                >
                    완료
                </button>
                <button
                    className={filter === 'undone' ? 'filter-button-active' : 'filter-button'}
                    onClick={() => setFilter('undone')}
                >
                    미완료
                </button>
            </div>

            <TodoBoard todoList={filteredList} setTodoList={setTodoList} onChange={handleCheckChange} />
        </div>
    );
}

export default App;
