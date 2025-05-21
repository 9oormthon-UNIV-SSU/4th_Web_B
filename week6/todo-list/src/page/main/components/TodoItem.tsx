import { Card, CardContent } from "@/components/ui/card";
import CustomCheckbox from "./CustomCheckbox";
import { TodoItemType } from "../page";
import { CustomModal } from "./CustomModal";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  toDo: TodoItemType;
  index: number;
  toggleDone: (index: number) => void;
  removeTodo: (index: number) => void;
}

export default function TodoItem({
  toDo,
  index,
  toggleDone,
  removeTodo,
}: TodoItemProps) {
  return (
    <Card className="flex justify-between items-center p-4">
      <CardContent className={toDo.done ? "line-through text-gray-400" : ""}>
        {toDo.text}
      </CardContent>
      <CustomCheckbox
        isChecked={toDo.done}
        setIsChecked={() => toggleDone(index)}
      />
      <CustomModal content={toDo.text} onClick={() => removeTodo(index)} />
    </Card>
  );
}

TodoItem.Skeleton = () => {
  return <Skeleton className={cn("w-112 h-40 rounded-xl")} />;
};
