import { useState } from 'react'
import '../App.css'

export default function TodoList({item, index, setItems}) {

  const handleDelete = (deleteIndex) => {
    setItems(prevItems => prevItems.filter((_, index) => index !== deleteIndex));
  };

  const handleToggleCheck = (deleteIndex) => {
    setItems(prev =>
      prev.map((item, index) =>
        index === deleteIndex ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <>
        <div className='todoList-item'>
            <div className='item-title'>
              <input
                className='checkbox'
                type="checkbox"
                checked={item.isChecked}
                onChange={() => {handleToggleCheck(index)}}
              />
              <div className={item.isChecked ? 'line-through' : ''}>{item.text}</div>
            </div>
            <div className='delete-btn' onClick={()=>{
                handleDelete(index)
            }}>삭제</div>
        </div>
    </>
  )
}