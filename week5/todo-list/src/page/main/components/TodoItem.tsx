import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomCheckbox from "./CustomCheckbox";
import { TodoItemType } from "../page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">삭제하기</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>진짜로 삭제할거임?</AlertDialogTitle>
            <AlertDialogDescription>내용: {toDo.text}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={() => removeTodo(index)}>
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
