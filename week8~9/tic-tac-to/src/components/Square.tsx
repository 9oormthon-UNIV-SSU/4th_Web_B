interface SquareProps {
  value: string | null;
  onClick: () => void;
}

export function Square({ value, onClick }: SquareProps) {
  return (
    <button
      onClick={onClick}
      className="w-20 h-20 text-2xl font-bold border border-gray-300 flex items-center justify-center"
    >
      {value}
    </button>
  );
}
