import * as React from "react";
import { Square } from "./Square";
import type { Player, Position } from "@/components/types";

interface BoardProps {
  squares: (Player | null)[];
  xIsNext: boolean;
  onPlay: (nextSquares: (Player | null)[], position: Position) => void;
  winningLine?: number[] | null;
}

export function Board({ squares, xIsNext, onPlay, winningLine }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice() as (Player | null)[];
    nextSquares[i] = xIsNext ? "❌" : "⭕️";
    const position: Position = { row: Math.floor(i / 3), col: i % 3 };
    onPlay(nextSquares, position);
  }

  return (
    <div className="flex flex-col gap-2">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex gap-2">
          {[0, 1, 2].map((col) => {
            const idx = row * 3 + col;
            const highlight = winningLine?.includes(idx) ?? false;
            return (
              <Square
                key={idx}
                value={squares[idx]}
                onClick={() => handleClick(idx)}
                highlight={highlight}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function calculateWinner(squares: (Player | null)[]): number[] | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line;
    }
  }
  return null;
}
