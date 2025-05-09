import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoBoard from "@/page/main/components/TodoBoard";
import { TodoContext, useTodo } from "./hook/useTodo";

export default function MainPage() {
  const [iValue, setIValue] = useState("");
  const todo = useTodo();

  const handleAdd = () => {
    todo.addItem(iValue);
    setIValue("");
  };

  return (
    <TodoContext.Provider value={todo}>
      <main className="flex flex-col items-center justify-start min-h-screen gap-4 my-4">
        <Input
          className="w-full"
          value={iValue}
          onChange={(e) => setIValue(e.target.value)}
        />
        <Button onClick={handleAdd}>추가</Button>
        <TodoBoard />
      </main>
    </TodoContext.Provider>
  );
}
