import { createContext, useContext, useState } from "react";

export interface TodoContextType {
  todoList: string[];
  addItem: (value: string) => void;
  removeTodo: (index: number) => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export function useTodo(): TodoContextType {
  const [todoList, setTodoList] = useState<string[]>([]);

  const addItem = (value: string) => {
    if (value.trim()) {
      setTodoList((prev) => [...prev, value]);
    }
  };

  const removeTodo = (index: number) => {
    setTodoList((prev) => prev.filter((_, i) => i !== index));
  };

  return { todoList, addItem, removeTodo };
}

export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);
  if (!context) {
    throw alert("context 에러");
  }
  return context;
}
