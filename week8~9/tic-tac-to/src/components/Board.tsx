import { Square } from "./Square";

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
}

export function Board({ squares, onClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 9 }, (_, i) => (
        <Square key={i} value={squares[i]} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}
