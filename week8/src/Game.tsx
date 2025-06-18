import { useState } from 'react';
import Board from './Board';
import Modal from './component/Modal';
import type { MoveLog } from './types/types';

export default function Game() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<MoveLog[]>(() => {
        const stored = localStorage.getItem('tictactoe-history');
        if (stored) {
            try {
                return JSON.parse(stored) as MoveLog[];
            } catch {
                return [];
            }
        }

        // 게임 시작 전 상태 -> 초기화
        return [
            {
                player: 'X',
                position: null,
                squares: Array(9).fill(null),
            },
        ];
    });
    const [currentMove, setCurrentMove] = useState(() => {
        const storedMove = localStorage.getItem('tictactoe-currentMove');
        return storedMove ? JSON.parse(storedMove) : 0;
    });
    const [winCount, setWinCount] = useState(() => {
        const storedWins = localStorage.getItem('tictactoe-winCount');
        return storedWins ? JSON.parse(storedWins) : { X: 0, O: 0 };
    });

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const currentWinner = calculateWinner(currentSquares);
    const status = currentWinner ? 'Winner: ' + currentWinner : 'Next player: ' + (xIsNext ? 'X' : 'O');

    function handlePlay(nextSquares: any) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        const nextMove = nextHistory.length - 1;

        const winner = calculateWinner(nextSquares);
        const updatedWinCount = { ...winCount };

        if (winner && winCount[winner] !== undefined) {
            setIsOpen(true);
            updatedWinCount[winner]++;
            setWinCount(updatedWinCount);
            localStorage.setItem('tictactoe-winCount', JSON.stringify(updatedWinCount));
        } else if (!winner && nextSquares.every((square: any) => square !== null)) {
            // 무승부인 경우
            setIsOpen(true); // 모달 띄움
        }

        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

        // Save to localStorage
        localStorage.setItem('tictactoe-history', JSON.stringify(nextHistory));
        localStorage.setItem('tictactoe-currentMove', JSON.stringify(nextMove));
    }

    function jumpTo(nextMove: any) {
        setCurrentMove(nextMove);
        localStorage.setItem('tictactoe-currentMove', JSON.stringify(nextMove));
    }

    //게임 초기화 함수
    function resetGame() {
        const emptySquares = Array(9).fill(null);

        const initial: MoveLog[] = [
            {
                player: 'X', // 게임 시작은 X
                position: null, // 초기에는 클릭한 위치 없음
                squares: emptySquares,
            },
        ];

        setHistory(initial);
        setCurrentMove(0);

        localStorage.setItem('tictactoe-history', JSON.stringify(initial));
        localStorage.setItem('tictactoe-currentMove', JSON.stringify(0));
    }

    const moves = history.map((squares: any, move: any) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <>
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{description}</button>
                </li>
            </>
        );
    });
    console.log('Status', status);

    return (
        <div className="w-2xl">
            <h1 className="mb-[15px]">Let's TicTacToc</h1>
            <div className="border-solid border-t border-b">
                <div className="flex m-auto justify-center items-center">
                    <p className="font-bold mr-1.5">🏆 X: {winCount.X} wins</p>
                    <p className="font-bold">🏆 O: {winCount.O} wins</p>

                    <button onClick={resetGame} className="border font-bold! p-[5px]! m-[8px] ">
                        Reset Game
                    </button>
                </div>
            </div>

            <div className="flex justify-between ">
                <div>
                    <div className="">{status}</div>
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} status={status} />
                </div>
                <div className="border"></div>
                <div className="w-2xs ">
                    <h2 className="text-xl font-medium">History</h2>
                    <ol>{moves}</ol>
                </div>
            </div>
            {isOpen && <Modal winner={currentWinner} onClose={() => setIsOpen(false)} />}
        </div>
    );
}

export function calculateWinner(squares: any) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}
