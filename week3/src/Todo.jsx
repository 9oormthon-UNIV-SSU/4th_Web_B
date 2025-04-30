import React, { useState } from 'react';
import './Todo.css';

function TodoApp() {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleAdd = () => {
    if (task.trim() === '') return;
    setTodoList([...todoList, task]);
    setTask('');
  };

  const handleDelete = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
  };

  return (
    <div className="container">
      <div className="input-section">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd}>추가</button>
      </div>

      <h2>Todo List</h2>

      {todoList.map((item, index) => (
        <div key={index} className="todo-item">
          <span>{item}</span>
          <button onClick={() => handleDelete(index)}>삭제</button>
        </div>
      ))}
    </div>
  );
}

export default TodoApp;
