import { Filter, TodoItemType } from "../page";
import TodoItem from "./TodoItem";

interface TodoBoardProps {
  filter: Filter;
  todoList: TodoItemType[];
  toggleDone: (index: number) => void;
  removeTodo: (index: number) => void;
}

export default function TodoBoard({
  filter,
  todoList,
  toggleDone,
  removeTodo,
}: TodoBoardProps) {
  const filteredList = todoList.filter((todo) => {
    if (filter === Filter.Done) return todo.done;
    if (filter === Filter.Undone) return !todo.done;
    return true;
  });

  return filteredList.length === 0 ? (
    <p className="text-gray-500 mt-4">할 일이 없습니다.</p>
  ) : (
    <div className="flex flex-col gap-2 w-full">
      {filteredList.map((toDo, index) => (
        <TodoItem
          key={index}
          toDo={toDo}
          index={index}
          toggleDone={toggleDone}
          removeTodo={removeTodo}
        />
      ))}
    </div>
  );
}

TodoBoard.Skeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: 5 }).map((_, idx) => (
        <TodoItem.Skeleton key={idx} />
      ))}
    </div>
  );
};
