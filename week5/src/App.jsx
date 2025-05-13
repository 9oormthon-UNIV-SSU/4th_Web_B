import { useState, useEffect } from 'react';
import TodoBoard from './component/TodoBoard';
import './App.css';
import Header from './component/Header';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetId, setTargetId] = useState(null);

    // ✅ 1. localStorage에서 불러오기
    useEffect(() => {
        const saved = localStorage.getItem('todoList');
        if (saved) {
            setTodoList(JSON.parse(saved));
        }
    }, []);

    // ✅ 2. todoList 변경 시 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]);

    const addItem = () => {
        if (!inputValue.trim()) {
            setErrorMessage('입력값을 입력해주세요.');
            setTimeout(() => setErrorMessage(''), 3000); // 3초 후 에러 메시지 제거
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            const newItem = {
                id: Date.now(),
                text: inputValue,
                checked: false,
                done: false,
            };
            setTodoList([...todoList, newItem]);
            setInputValue('');
            setIsLoading(false);
        }, 500);
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
    //아이템 삭제 처리 관련 함수
    const confirmDelete = () => {
        setTodoList(todoList.filter((todo) => todo.id !== targetId));
        setIsModalOpen(false);
        setTargetId(null);
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setTargetId(null);
    };

    //모달 관리 함수
    const openModal = (id) => {
        setTargetId(id);
        setIsModalOpen(true);
    };

    return (
        <div className="container">
            <Header />
            <div className="input-div">
                <input type="text" className="todo-input" onChange={(e) => setInputValue(e.target.value)} />
                <button className="todo-button" onClick={addItem} disabled={isLoading}>
                    {isLoading ? '로딩 중...' : '추가'}
                </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

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

            <TodoBoard
                todoList={filteredList}
                setTodoList={setTodoList}
                onChange={handleCheckChange}
                onDelete={openModal}
            />

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>삭제하시겠습니까?</p>
                        <div className="modal-buttons">
                            <button onClick={confirmDelete}>확인</button>
                            <button onClick={cancelDelete}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
