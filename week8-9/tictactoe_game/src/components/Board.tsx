import Square from "./Square";


type SquareValue = 'X' | 'O' | null;
type BoardState = SquareValue[];

type BoardProps = {
  xIsNext: boolean;
  squares: BoardState;
  onPlay: (nextSquares: BoardState) => void;
  calculateWinner(squares: BoardState) : SquareValue;
};

export default function Board({ xIsNext, squares, onPlay, calculateWinner }: BoardProps) {

  const rowStyle: string = "flex items-center justify-center w-[300px]";

  function handleClick(i: number): void {

    // 1. 게임이 끝났으면 아무것도 하지 않음
    // 2. 해당 칸이 이미 채워져 있다면 아무것도 하지 않음
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // sqares는 현재 상태의 보드판을 나타냄 
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  // 승리자가 누구인지 확인하는 함수 "O" OR "X" 
  const winner = calculateWinner(squares);
  let status;

  // 승리자가 있다면 승리자를 표시하고, 없다면 다음 플레이어를 표시
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="text-center text-2xl my-2">
        {winner ? (
          `Winner: ${winner}`
        ) : (
          <>
            Next player:{' '}
            <span className={xIsNext ? 'text-red-500' : 'text-green-500'}>
              {xIsNext ? 'X' : 'O'}
            </span>
          </>
        )}
      </div>
      <div className={rowStyle}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className={rowStyle}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className={rowStyle}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}