interface ModalProps {
  winner: string | null;
  onClose: () => void;
}

export function Modal({ winner, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <p className="text-lg text-black font-bold">
          {winner ? `${winner} 승리!` : "무승부!"}
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
