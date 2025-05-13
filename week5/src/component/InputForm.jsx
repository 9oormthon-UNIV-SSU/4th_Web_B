import React, { useState } from 'react';

function InputForm({ checked, onChange }) {
    const handleChange = (e) => {
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
