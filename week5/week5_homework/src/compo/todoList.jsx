import { useCounterStore , useDeleteIdStore } from '../js/store.js';
import '../App.css';

export default function TodoList({ id, item, setItems }) {
  const setModal = useCounterStore((state) => state.setModal);
  const setDeleteId = useDeleteIdStore((state) => state.setDeleteId);

  const handleToggleCheck = (toggleId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === toggleId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <div className='todoList-item'>
      <div className='item-title'>
        <input
          className='checkbox'
          type="checkbox"
          checked={item.isChecked}
          onChange={() => handleToggleCheck(id)}
        />
        <div className={item.isChecked ? 'line-through' : ''}>
          {item.text}
        </div>
      </div>
      <div
        className='delete-btn'
        onClick={() => {
          setModal(true);
          setDeleteId(id);
        }}
      >
        삭제
      </div>
    </div>
  );
}