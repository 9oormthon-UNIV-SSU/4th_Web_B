import React from 'react';
import { useErrorStore } from '../ts/store';
import '../index.css';

export default function Error() {
  const isError = useErrorStore((state) => state.isError);

  if (!isError) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
      에러가 발생했습니다.
    </div>
  );
}