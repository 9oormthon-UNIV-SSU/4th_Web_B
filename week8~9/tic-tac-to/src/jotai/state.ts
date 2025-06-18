import { atom } from "jotai";
import { getStorage } from "../utils/storage";
import type { MoveLog } from "../types/type";

export const historyAtom = atom<MoveLog[]>(
  getStorage("history", [{ squares: Array(9).fill(null), position: null }])
);

export const stepNumberAtom = atom<number>(getStorage("step", 0));
export const xIsNextAtom = atom<boolean>(getStorage("xIsNext", true));
export const xWinsAtom = atom<number>(getStorage("xWins", 0));
export const oWinsAtom = atom<number>(getStorage("oWins", 0));

export const currentAtom = atom((get) => get(historyAtom)[get(stepNumberAtom)]);

export const winnerAtom = atom((get) => {
  const squares = get(currentAtom).squares;
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
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
});

export const drawAtom = atom((get) => {
  const squares = get(currentAtom).squares;
  const winner = get(winnerAtom);
  return squares.every((s) => s !== null) && !winner;
});

export const historyLogAtom = atom((get) => {
  return get(historyAtom).map((log, index) => {
    const { position } = log;
    const desc =
      index === 0
        ? "Go to game start"
        : `Go to move #${index} (${position?.row}, ${position?.col})`;
    return { index, desc };
  });
});
