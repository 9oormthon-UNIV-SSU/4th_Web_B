import { useState } from 'react'
import './App.css'
import TodoBoard from './compo/todoBoard'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState(['할일1', '할일2', '할일3'])

  const handleDelete = (deleteIndex) => {
    setItems(prevItems => prevItems.filter((_, index) => index !== deleteIndex));
  };

  return (
    <>
      <div className='flex-box'>
        <input 
          className='input' type="text" 
          placeholder='할 일을 입력하세요' 
          value={inputValue} onChange={(e) => {
            setInputValue(e.target.value)
          }}
        />

        <div className='btn' onClick={(e)=>{
          //원래 같으면 다르게 해야할 것 같은데 previousSibling.value 기능 사용하면 더 간단하게 구현 가능한 듯 
          setItems([...items, inputValue])
          setInputValue('')
        }}>추가</div>
      </div>
      <TodoBoard items = {items} doDeleteByIndex = {handleDelete}/>
    </>
  )
}

export default App
