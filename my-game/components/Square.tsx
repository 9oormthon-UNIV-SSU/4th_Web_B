import * as React from "react";
import { cn } from "@/lib/utils";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  highlight?: boolean;
}

export function Square({ value, onClick, highlight = false }: SquareProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 border-pink-200 bg-pink-100 text-3xl sm:text-4xl font-bold flex items-center justify-center shadow-md transition-all duration-200",
        highlight
          ? "border-pink-400 bg-pink-200 scale-105 animate-pulse"
          : "hover:bg-pink-200 hover:scale-105 focus:ring-2 focus:ring-pink-300"
      )}
    >
      {value}
    </button>
  );
}
