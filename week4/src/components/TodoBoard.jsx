import TodoItem from './TodoItem';

function TodoBoard({ todoList, onToggle, onDelete }) {
  return (
    <>
      {todoList.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
export default TodoBoard;
