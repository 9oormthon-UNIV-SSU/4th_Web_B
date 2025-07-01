type SquareProps = {
    value: string;
    onSquareClick: () => void;
};

export default function Square({ value, onSquareClick }: SquareProps) {
    // const [value, setValue] = useState('O');
    // function handleClick() {
    //     setValue('X');
    // }

    return (
        <button
            onClick={onSquareClick}
            className="size-16 border-2 rounded-none! 
			"
        >
            {value}
        </button>
    );
}
