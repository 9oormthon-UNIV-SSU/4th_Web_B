import { useState } from 'react'
import './App.css'

import Header from './compo/header'
import TodoBoard from './compo/todoBoard'
import InputForm from './compo/inputForm'

//week3 에서는 handleDelete 함수를 만들어서 하위 컴포넌트로 넘겨주는 방식을 채택하였습니다만 week4에서는 다른 방식을 채택했습니다.
//week4에서는 setItems를 직접 넘겨서 하위 컴포넌트가 조작하는 방식으로 만들었습니다. 
//이런 방식을 채택한 이유는 다음과 같습니다. 
//APP.jsx의 내부를 헤더,인풋,메인 컴포넌트로 쪼갠 것 = app.jsx를 최대한 단순하게 유지하고자 함이 목적 
// => 따라서 set함수를 넘겨서 하위 컴포넌트가 직접 관리하도록 했습니다. (하위 컴포넌트에 관리 로직이 들어가기 때문에 app.jsx를 단순하게 유지 가능)

function App() {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState([{text : '할일1', isChecked : false}, {text : '할일2', isChecked : false}, {text : '할일3', isChecked : false}])

  return (
    <>
      <Header/>
      <InputForm inputValue={inputValue} setInputValue={setInputValue} items={items} setItems={setItems}/>
      <TodoBoard items = {items} setItems={setItems}/>
    </>
  )
}

export default App
