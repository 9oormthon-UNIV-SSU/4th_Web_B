import { useState } from 'react'
import '../App.css'

export default function InputForm({inputValue, setInputValue, items, setItems}) {

    return (
        <>
            <div className='flex-box'>
                <input 
                    className='input' type="text" 
                    placeholder='할 일을 입력하세요' 
                    value={inputValue} onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                />

                <div className='btn' onClick={(e)=>{
                    setItems([...items, {text: inputValue, isChecked : false}])
                    setInputValue('')
                }}>추가</div>
            </div>
        </>
    )
}
