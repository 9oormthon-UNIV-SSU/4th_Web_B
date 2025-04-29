import { useState } from 'react'
import '../App.css'
import TodoList from './todoList'

export default function TodoBoard({items, doDeleteByIndex}) {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='todoList-title'>Todo List</div>
      {items.map((item, index) => (
        <TodoList key={index} index={index} item={item} doDeleteByIndex = {doDeleteByIndex}/>
      ))}
    </>
  )
}
