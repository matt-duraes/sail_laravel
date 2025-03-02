import React from 'react';

interface FormInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, value, onChange, error }) => (
    <label htmlFor={name} className='form-label'>
        <p className='texto-label'>{label}</p>
        <input
            name={name}
            value={value}
            onChange={onChange}
            className='form-input'
            aria-invalid={!!error}
            aria-describedby={`${name}-error`}
        />
        {error && <div id={`${name}-error`} className="text-red-600">{error}</div>}
    </label>
);

export default FormInput;