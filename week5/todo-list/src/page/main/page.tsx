import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputForm from "./components/InputForm";
import TodoItem from "./components/TodoItem";
import { Loader2 } from "lucide-react";

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

  useEffect(() => {
    const stored = localStorage.getItem("todoList");
    if (stored) {
      try {
        setTodoList(JSON.parse(stored));
      } catch (err) {
        console.error("localStorage 파싱 오류", err);
      }
    }
  }, []);

  useEffect(() => {
    if (todoList.length === 0) return;
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log(localStorage.getItem("todoList"));
  }, [todoList]);

  const handleAdd = () => {
    if (!iValue) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setTodoList([...todoList, { text: iValue, done: false }]);
      setIValue("");
      setIsLoading(false);
    }, 500);
    if (iValue.trim()) {
      setTodoList([...todoList, { text: iValue, done: false }]);
      setIValue("");
    }
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

  const filteredList = todoList.filter((todo) => {
    if (filter === Filter.Done) return todo.done;
    if (filter === Filter.Undone) return !todo.done;
    return true;
  });

  return (
    <main className="flex flex-col items-center justify-start min-h-screen gap-4 my-4 w-full max-w-md mx-auto">
      <InputForm iValue={iValue} setIValue={setIValue} />
      {error && (
        <p className="text-red-500 font-semibold">입력값이 비어있습니다.</p>
      )}
      <Button onClick={handleAdd} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="animate-spin size-4" />
          </>
        ) : (
          "추가"
        )}
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
      {filteredList.length === 0 ? (
        <p className="text-gray-500 mt-4">할 일이 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          {filteredList.map((todo, index) => (
            <TodoItem
              key={index}
              toDo={todo}
              index={index}
              toggleDone={toggleDone}
              removeTodo={removeTodo}
            />
          ))}
        </div>
      )}
    </main>
  );
}
