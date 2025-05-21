import React from 'react';
import '../index.css';
import { useCounterStore, useDeleteIdStore } from '../ts/store';
import { TodoItem } from '../types/types';

interface ModalProps {
    items: TodoItem[];
    setItems: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

export default function Modal({items, setItems}: ModalProps) {
    const isModal = useCounterStore((state) => state.isModal);
    const setModal = useCounterStore((state) => state.setModal);
    const deleteId = useDeleteIdStore((state) => state.deleteId);

    if (!isModal) return null;

    const handleDelete = (deleteId : number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== deleteId));
    };


    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={()=>setModal(false)}
        >
            <div
                className="bg-white rounded-xl p-6 shadow-lg min-w-[300px] max-w-[90%]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold mb-4 text-center">삭제하시겠습니까?</h2>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => {
                            handleDelete(deleteId);
                            setModal(false);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        확인
                    </button>
                    <button
                        onClick={()=>setModal(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}