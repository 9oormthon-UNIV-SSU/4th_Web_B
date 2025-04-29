import TodoItem from "@/page/main/components/TodoItem";

interface TodoBoardProps {
  todoList: string[];
}

export default function TodoBoard({ todoList }: TodoBoardProps) {
  return (
    <div>
      <h1 className="my-2 text-2xl font-semibold text-center">Todo List</h1>
      <div className="flex flex-col gap-2">
        {todoList.map((toDo, index) => (
          <TodoItem key={index} toDo={toDo} />
        ))}
      </div>
    </div>
  );
}
