import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TodoBoard from "@/page/main/components/TodoBoard";
import { useState } from "react";

// 1. 인풋창이 있고 버튼이 있다.
// 2. 인풋창에 값을 입력하고 버튼을 클릭하면 아이템이 추가 된다.
// 3. 아이템 삭제버튼을 누르면 삭제가 가능하다다

export default function MainPage() {
  const [iValue, setIValue] = useState<string>("");
  const [todoList, setTodoList] = useState<string[]>([]);
  const addItem = () => {
    setTodoList([...todoList, iValue]);
  };
  return (
    <main className="flex flex-col items-center justify-start min-h-screen gap-4 my-4">
      <Input
        className="w-full"
        type="text"
        value={iValue}
        onChange={(event) => setIValue(event.target.value)}
      />
      <Button onClick={addItem}>추가</Button>
      <TodoBoard todoList={todoList} />
    </main>
  );
}
