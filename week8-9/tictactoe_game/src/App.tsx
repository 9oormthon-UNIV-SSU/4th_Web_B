import { useEffect, useState } from 'react';
import Board from './components/Board';
import './App.css';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

type SquareValue = 'X' | 'O' | null;
type BoardState = SquareValue[];

type Score = {
  X: number;
  O: number;
};

const HISTORY_KEY = 'tic-tac-toe-history';
const SCORE_KEY = 'tic-tac-toe-score';

function App() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState<BoardState[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [score, setScore] = useState<Score>({ X: 0, O: 0 });
  const currentSquares: BoardState = history[currentMove];
  const [winner, setWinner] = useState<SquareValue>(null);

  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [width, height] = useWindowSize();

  // 1. 복원 useEffect
  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    const savedScore = localStorage.getItem(SCORE_KEY);

    if (savedHistory) {
      try {
        const parsed: {
          history: BoardState[];
          currentMove: number;
          xIsNext: boolean;
        } = JSON.parse(savedHistory);
        
        setHistory(parsed.history);
        setCurrentMove(parsed.currentMove);
        setXIsNext(parsed.xIsNext);
      } catch (e) {
        console.error("불러오기 실패", e);
      }
    }

    if (savedScore) {
      setScore(JSON.parse(savedScore));
    }

    // 복원 완료 표시
    setIsInitialized(true);
  }, []);

  // 2. 저장 useEffect (복원 이후에만 실행되게)
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify({ history, currentMove, xIsNext })
    );
  }, [history, currentMove, xIsNext, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(SCORE_KEY, JSON.stringify(score));
  }, [score, isInitialized]);

  function handlePlay(nextSquares: BoardState) {
    const nextHistory: BoardState[] = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);

    const result = calculateWinner(nextSquares);
    if (result === 'X' || result === 'O') {
      setScore((prev) => ({ ...prev, [result]: prev[result] + 1 }));
      setWinner(result);
    }
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function resetGame(): void {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
  }

  function resetScore(): void {
    setScore({ X: 0, O: 0 });
  }

  const moves = history.map((_, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <div
          className="bg-gray-100 m-4 p-4 rounded-sm cursor-pointer hover:bg-gray-200"
          onClick={() => jumpTo(move)}
        >
          {description}
        </div>
      </li>
    );
  });

  return (
    <div className="mx-auto w-[900px] ">
      <h1 className="text-5xl text-center bg-gray-100 py-6">TicTacToe Game</h1>

      <div className="bg-gray-50 h-[50px]">
        <div className="w-full h-full flex items-center justify-evenly">
          <p className="text-red-500 font-bold">X Wins: {score.X}</p>
          <p className="text-green-500 font-bold">O Wins: {score.O}</p>
        </div>
      </div>

      <div className="flex items-center justify-center h-[500px]">
        <div className="w-[50%] flex items-center justify-center">
          <div>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} calculateWinner={calculateWinner} />
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <div>
            <h2 className="text-2xl text-center mb-4">Game History</h2>
            <div className="text-center mb-4 h-[400px] overflow-y-scroll over-flow-x-hidden">
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 h-[50px] bg-gray-100">
        <div
          className="px-6 py-2 bg-blue-200 hover:bg-blue-300 rounded cursor-pointer"
          onClick={resetGame}
        >
          Reset Game
        </div>
        <div
          className="px-6 py-2 bg-red-200 hover:bg-red-300 rounded cursor-pointer"
          onClick={resetScore}
        >
          Reset Score
        </div>
      </div>
      {winner && (
        <>
          <Confetti width={width} height={height}
            numberOfPieces={300}
            gravity={0.3}
            recycle={false} />

          <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center relative w-[300px]">
              <button
                className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl font-bold"
                onClick={() => setWinner(null)}
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">🎉 축하합니다! 🎉</h2>
              <p className="text-xl mb-6 font-bold">승자는: <span className={`${winner === 'X' ? 'text-red-400' : 'text-green-400'}`}>{winner}</span>님 입니다</p>
              <button
                className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded"
                onClick={() => {
                  resetGame();
                  setWinner(null);
                }}
              >
                Reset Game
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function calculateWinner(squares: BoardState): SquareValue {
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
