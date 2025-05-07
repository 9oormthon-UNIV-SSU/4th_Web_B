import { useTodoContext } from "../hook/useTodo";
import { Filter } from "../page";
import TodoItem from "./TodoItem";

interface TodoBoardProps {
  filter: Filter;
}

export default function TodoBoard({ filter }: TodoBoardProps) {
  const { todoList } = useTodoContext();

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
        <TodoItem key={index} toDo={toDo} index={index} />
      ))}
    </div>
  );
}
