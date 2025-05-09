import React, { useState } from 'react';
import './Todo.css';
import Header from './components/Header';
import InputForm from './components/InputForm';
import TodoBoard from './components/TodoBoard';
import FilterButton from './components/FilterButton';

function TodoApp() {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleAdd = () => {
    if (task.trim() === '') return;
    const newItem = { text: task, done: false };
    setTodoList([...todoList, newItem]);
    setTask('');
  };

  const handleToggle = (index) => {
    const updatedList = [...todoList];
    updatedList[index].done = !updatedList[index].done;
    setTodoList(updatedList);
  };

  const handleDelete = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
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
      />
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
    </div>
  );
}

export default TodoApp;
