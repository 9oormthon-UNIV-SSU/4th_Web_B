import React, { useState, useEffect } from 'react';
import './Todo.css';
import Header from './components/Header';
import InputForm from './components/InputForm';
import TodoBoard from './components/TodoBoard';
import FilterButton from './components/FilterButton';
import DeleteModal from './components/DeleteModal';

function TodoApp() {
  const [task, setTask] = useState('');

  // 페이지 진입 시, 초기값 로컬스토리지에서
  const [todoList, setTodoList] = useState(() => {
    const savedTodo = localStorage.getItem('todoList');
    return savedTodo ? JSON.parse(savedTodo) : [];
  });

  const [filter, setFilter] = useState('all');

  // 로딩, 에러 상태관리 변수
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // 모달창 상태관리 변수
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 삭제할 항목의 인덱스 관리
  const [selectedIndex, setSelectedIndex] = useState(null);

  // todoList 변화가 있을 때마다 로컬스토리지에 데이터 업데이트
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const handleAdd = () => {
    if (task.trim() === '') {
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
      return;
    }
  
    setIsLoading(true);
    setTimeout(() => {
      const newItem = { text: task, done: false };
      setTodoList([...todoList, newItem]);
      setTask('');
      setIsLoading(false);
    }, 500);
  };

  const handleToggle = (index) => {
    const updatedList = [...todoList];
    updatedList[index].done = !updatedList[index].done;
    setTodoList(updatedList);
  };

  const handleDelete = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };
  
  const confirmDelete = () => {
    const updatedList = todoList.filter((_, i) => i !== selectedIndex);
    setTodoList(updatedList);
    setIsModalOpen(false);
    setSelectedIndex(null);
  };
  
  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  const filteredList = todoList.filter((item) => {
    if (filter === 'done') return item.done;
    if (filter === 'undone') return !item.done;
    return true;
  });

  return (
    <div className="container">
      <Header />
      <InputForm
        inputValue={task}
        setInputValue={setTask}
        addItem={handleAdd}
        isLoading={isLoading}
      />
      {isError && <p className="error">할 일을 입력하세요.</p>}
      {isLoading && <p className="loading">로딩중 ..</p>}
      <FilterButton filter={filter} setFilter={setFilter} />
      {filteredList.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        <TodoBoard
          todoList={filteredList}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
      {isModalOpen && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default TodoApp;
