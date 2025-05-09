import { useState } from "react";
import { Button } from "@/components/ui/button";
import TodoBoard from "@/page/main/components/TodoBoard";
import { TodoContext, useCreateTodo } from "./hook/useTodo";
import InputForm from "./components/InputForm";

type Filter = "all" | "done" | "undone";

export default function MainPage() {
  const [iValue, setIValue] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const todo = useCreateTodo();

  const handleAdd = () => {
    todo.addItem(iValue);
    setIValue("");
  };

  return (
    <TodoContext.Provider value={todo}>
      <main className="flex flex-col items-center justify-start min-h-screen gap-4 my-4 w-full max-w-md mx-auto">
        <InputForm iValue={iValue} setIValue={setIValue} />
        <Button onClick={handleAdd}>추가</Button>
        <div className="flex gap-2">
          {(["all", "done", "undone"] as Filter[]).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "전체" : f === "done" ? "완료" : "미완료"}
            </Button>
          ))}
        </div>
        <TodoBoard filter={filter} />
      </main>
    </TodoContext.Provider>
  );
}
