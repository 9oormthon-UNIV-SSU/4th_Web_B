import { useTodoContext } from "../hook/useTodo";
import TodoItem from "./TodoItem";

export default function TodoBoard() {
  const { todoList } = useTodoContext();

  return (
    <div>
      <h1 className="my-2 text-2xl font-semibold text-center">Todo List</h1>
      <div className="flex flex-col gap-2">
        {todoList.map((toDo, index) => (
          <TodoItem key={index} toDo={toDo} index={index} />
        ))}
      </div>
    </div>
  );
}
