import { useState } from 'react'
import { useErrorStore } from '../js/store';
import '../App.css'

export default function InputForm({ inputValue, setInputValue, items, setItems }) {
    const [isLoading, setIsLoading] = useState(false)
    const setError = useErrorStore((state) => state.setError);

    const handleAddItem = () => {
        if (!inputValue.trim()) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
            return;
        };

        setIsLoading(true);

        setTimeout(() => {
            setItems([...items, {id: Date.now(), text: inputValue, isChecked: false }]);
            setInputValue('');
            setIsLoading(false);
        }, 500);
    };

    return (
        <>
            <div className='flex-box'>
                <input 
                    className='input' 
                    type="text" 
                    placeholder='할 일을 입력하세요' 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                />

                <button 
                    className='btn' 
                    onClick={handleAddItem} 
                    disabled={isLoading}
                >
                    {isLoading ? '로딩 중...' : '추가'}
                </button>
            </div>
        </>
    )
}