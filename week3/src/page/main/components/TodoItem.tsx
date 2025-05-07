import { useTodoContext } from "../hook/useTodo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TodoItemProps {
  toDo: string;
  index: number;
}

export default function TodoItem({ toDo, index }: TodoItemProps) {
  const { removeTodo } = useTodoContext();

  return (
    <Card className="flex justify-between items-center p-4">
      <CardContent>{toDo}</CardContent>
      <Button variant="destructive" onClick={() => removeTodo(index)}>
        삭제
      </Button>
    </Card>
  );
}
