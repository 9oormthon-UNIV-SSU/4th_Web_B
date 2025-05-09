import { createContext, useContext, useState } from "react";

// 각 Todo 아이템 구조 정의
export interface TodoItemType {
  text: string;
  done: boolean;
}

// context에 담길 타입 정의
export interface TodoContextType {
  todoList: TodoItemType[];
  addItem: (value: string) => void;
  removeTodo: (index: number) => void;
  toggleDone: (index: number) => void;
}

// Context 생성 (초깃값은 null)
export const TodoContext = createContext<TodoContextType | null>(null);

// Custom Hook - Provider에서만 호출, MainPage에서 사용
export function useCreateTodo(): TodoContextType {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  // 새로운 Todo 추가
  const addItem = (value: string) => {
    if (value.trim()) {
      setTodoList((prev) => [...prev, { text: value, done: false }]);
    }
  };

  // 특정 인덱스 항목 삭제
  const removeTodo = (index: number) => {
    setTodoList((prev) => prev.filter((_, i) => i !== index));
  };

  // 완료 상태 토글
  const toggleDone = (index: number) => {
    setTodoList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      )
    );
  };

  return { todoList, addItem, removeTodo, toggleDone };
}

// Custom Hook - Consumer 컴포넌트에서 context 값 사용
export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("TodoContext가 설정되지 않았습니다.");
  }
  return context;
}
