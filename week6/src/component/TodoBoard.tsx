import React from 'react';
import TodoItem from './TodoItem';
import Header from './Header';
import { TodoBoardProps } from '../types/types';

//타입을 컴포넌트 별로 작성하니 재사용성이 높은 타입은 계속 재정의 해야 하는 불편함이 있음
//=> 타입 관리하는 파일을 별도로 분리해서 관리하려 함

function TodoBoard({ todoList, setTodoList, onChange, onDelete }: TodoBoardProps) {
    console.log(todoList);
    return (
        <div>
            <div className="items-container">
                {todoList.length > 0 ? (
                    todoList.map((item) => (
                        <TodoItem
                            key={item.id}
                            item={item}
                            index={item.id}
                            todoList={todoList}
                            setTodoList={setTodoList}
                            onChange={onChange}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <p>할 일이 없습니다!</p>
                )}
            </div>
        </div>
    );
}

export default TodoBoard;
