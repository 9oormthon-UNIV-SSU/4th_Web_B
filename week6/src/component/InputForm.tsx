import React, { useState } from 'react';
import { InputFormProps } from '../types/types';

function InputForm({ checked, onChange }: InputFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };
    console.log('inputform', checked);
    return (
        <label>
            <input type="checkbox" checked={checked} onChange={handleChange} />
        </label>
    );
}

export default InputForm;
