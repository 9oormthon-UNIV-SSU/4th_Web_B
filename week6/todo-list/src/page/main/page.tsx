import { useState } from "react";
import { Button } from "@/components/ui/button";
import InputForm from "./components/InputForm";
import TodoBoard from "./components/TodoBoard";
import { Loader2 } from "lucide-react";
import { useLocalStorage } from "./hooks/useLocalStorage";

export enum Filter {
  All = "all",
  Done = "done",
  Undone = "undone",
}

export interface TodoItemType {
  text: string;
  done: boolean;
}

export default function MainPage() {
  const [iValue, setIValue] = useState<string>("");
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useLocalStorage({
    key: "todoList",
    value: todoList,
    setValue: setTodoList,
    setIsLoading,
  });

  const handleAdd = () => {
    if (!iValue.trim()) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setTodoList((prev) => [...prev, { text: iValue, done: false }]);
      setIValue("");
      setIsLoading(false);
    }, 500);
  };

  const toggleDone = (index: number) => {
    setTodoList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      )
    );
  };

  const removeTodo = (index: number) => {
    setTodoList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen gap-4 w-full max-w-md mx-auto">
      <InputForm iValue={iValue} setIValue={setIValue} />
      {error && (
        <p className="text-red-500 font-semibold">입력값이 비어있습니다.</p>
      )}
      <Button onClick={handleAdd} disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin size-4" /> : "추가"}
      </Button>
      <div className="flex gap-2">
        {(Object.values(Filter) as Filter[]).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
            disabled={isLoading}
          >
            {f === Filter.All ? "전체" : f === Filter.Done ? "완료" : "미완료"}
          </Button>
        ))}
      </div>

      {/* ✅ TodoBoard 또는 Skeleton */}
      {isLoading ? (
        <TodoBoard.Skeleton />
      ) : (
        <TodoBoard
          filter={filter}
          todoList={todoList}
          toggleDone={toggleDone}
          removeTodo={removeTodo}
        />
      )}
    </main>
  );
}
