import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoItem } from './types/types';
import './App.css';
import './index.css';

import Header from './compo/header';
import TodoBoard from './compo/todoBoard';
import InputForm from './compo/inputForm';
import Modal from './compo/modal';
import Error from './compo/error';

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [localStorageItems, setLocalStorageItems] = useLocalStorage<TodoItem[]>('items', []);

  return (
    <div className='relative'>
      <Header />
      <InputForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        items={localStorageItems}
        setItems={setLocalStorageItems}
      />
      <TodoBoard items={localStorageItems} setItems={setLocalStorageItems} />
      <Modal items={localStorageItems} setItems={setLocalStorageItems} />
      <Error />
    </div>
  );
}

export default App;