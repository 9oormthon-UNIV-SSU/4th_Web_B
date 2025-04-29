import { useState } from 'react'
import '../App.css'

export default function TodoList({item, index, doDeleteByIndex}) {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className='todoList-item'>
            <div className='item-title'>{item}</div>
            <div className='delete-btn' onClick={()=>{
                doDeleteByIndex(index)
            }}>삭제</div>
        </div>
    </>
  )
}