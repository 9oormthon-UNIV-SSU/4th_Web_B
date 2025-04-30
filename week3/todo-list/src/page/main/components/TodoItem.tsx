import { Card, CardContent } from "@/components/ui/card";

interface TodoItemProps {
  toDo: string;
}

export default function TodoItem({ toDo }: TodoItemProps) {
  return (
    <Card>
      <CardContent>{toDo}</CardContent>
    </Card>
  );
}
