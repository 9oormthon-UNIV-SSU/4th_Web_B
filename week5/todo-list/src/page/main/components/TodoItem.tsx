import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomCheckbox from "./CustomCheckBox";
import { useTodoContext } from "../hook/useTodo";

interface TodoItemProps {
  toDo: { text: string; done: boolean };
  index: number;
}

export default function TodoItem({ toDo, index }: TodoItemProps) {
  const { removeTodo, toggleDone } = useTodoContext();

  return (
    <Card className="flex justify-between items-center p-4">
      <CardContent className={toDo.done ? "line-through text-gray-400" : ""}>
        {toDo.text}
      </CardContent>
      <CustomCheckbox
        isChecked={toDo.done}
        setIsChecked={() => toggleDone(index)}
      />
      <Button variant="destructive" onClick={() => removeTodo(index)}>
        삭제
      </Button>
    </Card>
  );
}
