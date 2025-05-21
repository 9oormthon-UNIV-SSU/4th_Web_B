// Todo 타입
export type Todo = {
    id: number;
    text: string;
    checked: boolean;
    done: boolean;
};

//props 타입
export interface TodoItemProps {
    item: Todo;
    index: number;
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    onChange: (id: number, checked: boolean) => void;
    onDelete: (id: number) => void;
}

export interface TodoBoardProps {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    onChange: (id: number, checked: boolean) => void;
    onDelete: (id: number) => void;
}

export interface InputFormProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}
