type ModalProps = {
    winner: string;
    onClose: () => void;
};

export default function Modal({ winner, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-semibold mb-4">
                    {winner ? `🎉 Winner: ${winner} 🎉` : '🤝 무승부입니다! 🤝'}
                </h2>

                <div className="text-center">
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}
