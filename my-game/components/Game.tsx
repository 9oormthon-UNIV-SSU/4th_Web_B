"use client";

import * as React from "react";
import { Board } from "./Board";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  Player,
  Position,
  MoveLog,
  GameState,
  WinnerInfo,
} from "@/components/types";

const STORAGE_KEY = "tictactoe-state";

const initialSquares: (Player | null)[] = Array(9).fill(null);
const initialMoveLog: MoveLog = { squares: initialSquares, position: null };
const initialState: GameState = {
  history: [initialMoveLog],
  currentMove: 0,
  xWins: 0,
  oWins: 0,
};

function calculateWinner(squares: (Player | null)[]): WinnerInfo | null {
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
      return { winner: squares[a] as Player, line };
    }
  }
  return null;
}

function loadState(): GameState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      !Array.isArray(parsed.history) ||
      typeof parsed.currentMove !== "number" ||
      typeof parsed.xWins !== "number" ||
      typeof parsed.oWins !== "number"
    )
      return initialState;
    return parsed;
  } catch {
    return initialState;
  }
}

export function Game() {
  const [history, setHistory] = React.useState<MoveLog[]>(initialState.history);
  const [currentMove, setCurrentMove] = React.useState(
    initialState.currentMove
  );
  const [xWins, setXWins] = React.useState(initialState.xWins);
  const [oWins, setOWins] = React.useState(initialState.oWins);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalResult, setModalResult] = React.useState<Player | "draw" | null>(
    null
  );

  // localStorage 복원
  React.useEffect(() => {
    const state = loadState();
    setHistory(state.history);
    setCurrentMove(state.currentMove);
    setXWins(state.xWins);
    setOWins(state.oWins);
  }, []);

  // localStorage 저장
  React.useEffect(() => {
    const state: GameState = { history, currentMove, xWins, oWins };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [history, currentMove, xWins, oWins]);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const winnerInfo = calculateWinner(currentSquares);
  const isDraw = !winnerInfo && currentSquares.every(Boolean);

  // 게임 종료 시 모달 오픈
  React.useEffect(() => {
    if (winnerInfo) {
      setModalResult(winnerInfo.winner);
      setModalOpen(true);
    } else if (isDraw) {
      setModalResult("draw");
      setModalOpen(true);
    }
  }, [winnerInfo, isDraw]);

  // 승리 시 카운트 증가
  React.useEffect(() => {
    if (!winnerInfo) return;
    if (currentMove === 0) return; // 첫 판은 무시
    if (winnerInfo.winner === "❌") setXWins((w) => w + 1);
    if (winnerInfo.winner === "⭕️") setOWins((w) => w + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalResult]);

  function handlePlay(nextSquares: (Player | null)[], position: Position) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, position },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  function handleResetScores() {
    setXWins(0);
    setOWins(0);
  }

  function handleRestart() {
    setHistory([initialMoveLog]);
    setCurrentMove(0);
    setModalOpen(false);
    setModalResult(null);
  }

  let status: React.ReactNode;
  if (winnerInfo) {
    status = (
      <span className="text-pink-500 font-bold animate-bounce">
        승자: {winnerInfo.winner}
      </span>
    );
  } else if (isDraw) {
    status = <span className="text-pink-400 font-semibold">무승부!</span>;
  } else {
    status = (
      <span className="text-pink-400">
        다음 플레이어:{" "}
        <span className="font-bold">{xIsNext ? "❌" : "⭕️"}</span>
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 p-15 bg-pink-50 rounded-2xl shadow-lg border border-pink-100 max-w-md mx-auto animate-fade-in">
      <div className="text-2xl mb-2 font-extrabold text-pink-400 transition-all">
        Tic-Tac-Toe
      </div>
      <div className="flex items-center gap-4 mb-2 w-full justify-center">
        <span className="text-pink-500/80 font-bold">❌ wins : {xWins}</span>
        <span className="text-pink-500/80 font-bold">⭕️ wins : {oWins}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetScores}
          className="ml-2 text-pink-400 border-pink-400 shadow-sm hover:text-pink-600"
        >
          reset scores
        </Button>
      </div>
      <div className="mb-4 text-lg transition-all">{status}</div>
      <Board
        squares={currentSquares}
        xIsNext={xIsNext}
        onPlay={handlePlay}
        winningLine={winnerInfo?.line}
      />
      <ol className="mt-6 space-y-2 w-full">
        {history.map((moveLog, move) => {
          const isCurrent = move === currentMove;
          return (
            <li key={move} className="w-full">
              <Button
                onClick={() => jumpTo(move)}
                variant={isCurrent ? "secondary" : "outline"}
                className={
                  "w-full py-1 rounded-lg transition-all " +
                  (isCurrent
                    ? "bg-pink-300 text-white font-bold shadow-inner cursor-default"
                    : "bg-pink-100 hover:bg-pink-200 text-pink-700 font-medium")
                }
                disabled={isCurrent}
                size="sm"
              >
                {move === 0 ? "Game Start" : `Go to ${move}`}
              </Button>
            </li>
          );
        })}
      </ol>
      <Button
        onClick={handleRestart}
        className="mt-4 w-full bg-pink-400 hover:bg-pink-500 text-white font-bold"
      >
        Restart
      </Button>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-white rounded-2xl shadow-xl border-2 border-pink-200 flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-2xl text-pink-600 font-extrabold">
              {modalResult === "draw"
                ? "🤝 무승부! 🤝"
                : `🎉 Winner : ${modalResult} 🎉`}
            </DialogTitle>
          </DialogHeader>
          <Button
            onClick={handleRestart}
            className="mt-6 w-40 bg-pink-400 hover:bg-pink-500 text-white font-bold"
          >
            Restart Game
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
