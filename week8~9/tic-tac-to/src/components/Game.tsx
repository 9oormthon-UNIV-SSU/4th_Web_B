import { useEffect } from "react";
import { useAtom } from "jotai";
import { Board } from "./Board";
import {
  historyAtom,
  stepNumberAtom,
  xIsNextAtom,
  xWinsAtom,
  oWinsAtom,
  currentAtom,
  winnerAtom,
  drawAtom,
  historyLogAtom,
} from "../jotai/state";
import { setStorage } from "../utils/storage";
import { showModalAtom } from "../jotai/modal";
import { Modal } from "./Modal";

export function Game() {
  const [history, setHistory] = useAtom(historyAtom);
  const [stepNumber, setStepNumber] = useAtom(stepNumberAtom);
  const [xIsNext, setXIsNext] = useAtom(xIsNextAtom);
  const [xWins, setXWins] = useAtom(xWinsAtom);
  const [oWins, setOWins] = useAtom(oWinsAtom);
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const [current] = useAtom(currentAtom);
  const [winner] = useAtom(winnerAtom);
  const [draw] = useAtom(drawAtom);
  const [historyLog] = useAtom(historyLogAtom);

  useEffect(() => {
    setStorage("history", history);
    setStorage("step", stepNumber);
    setStorage("xIsNext", xIsNext);
    setStorage("xWins", xWins);
    setStorage("oWins", oWins);
  }, [history, stepNumber, xIsNext, xWins, oWins]);

  useEffect(() => {
    if (winner || draw) {
      setShowModal(true);
      if (winner === "X") setXWins((prev) => prev + 1);
      else if (winner === "O") setOWins((prev) => prev + 1);
    }
  }, [winner, draw, setShowModal, setXWins, setOWins]);

  const handleClick = (i: number) => {
    const timeHistory = history.slice(0, stepNumber + 1);
    const currentSquares = [...current.squares];
    if (winner || currentSquares[i]) return;

    currentSquares[i] = xIsNext ? "X" : "O";

    setHistory([
      ...timeHistory,
      {
        squares: currentSquares,
        position: { row: Math.floor(i / 3), col: i % 3 },
      },
    ]);
    setStepNumber(timeHistory.length);
    setXIsNext(!xIsNext);
  };

  const restartGame = () => {
    setHistory([{ squares: Array(9).fill(null), position: null }]);
    setStepNumber(0);
    setXIsNext(true);
    setShowModal(false);
  };

  const resetWins = () => {
    setXWins(0);
    setOWins(0);
  };

  const jumpTo = (move: number) => {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
    setShowModal(false);
  };

  return (
    <main className="flex flex-col w-screen items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
      <section className="flex gap-4 items-center">
        <div>X Wins: {xWins}</div>
        <div>O Wins: {oWins}</div>
        <button
          onClick={resetWins}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset Score
        </button>
      </section>
      <section className="flex flex-row gap-4 items-start">
        <div className="flex flex-col gap-4">
          <Board squares={current.squares} onClick={handleClick} />
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Restart
          </button>
        </div>
        <div className="flex flex-col gap-1 items-start justify-start">
          {historyLog.map((log) => (
            <button
              key={log.index}
              onClick={() => jumpTo(log.index)}
              className="text-left text-sm hover:underline"
            >
              {log.desc}
            </button>
          ))}
        </div>
      </section>
      {showModal && <Modal winner={winner} onClose={restartGame} />}
    </main>
  );
}
