
// 타입 정의
type SquareValue = 'X' | 'O' | null;

type squareProps = {
    value: SquareValue;
    onSquareClick: () => void;
}

export default function Square({ value, onSquareClick }: squareProps) {
    const square: string = `
        w-[100%] aspect-[1/1] 
        border-1 border-gray-400 border-dashed 
        text-2xl font-bold flex 
        items-center justify-center 
        transition-colors`;

    const bgColor =
        value === 'X'
            ? 'bg-red-100 hover:bg-red-200'
            : value === 'O'
                ? 'bg-green-100 hover:bg-green-200'
                : 'bg-white hover:bg-gray-100';

    return <button className={`${bgColor} ${square} `} onClick={onSquareClick}>{value}</button>;
}
