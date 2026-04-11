import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`input-group ${className}`}>
      <label className="input-label">{label}</label>
      <input className={`input ${error ? 'input-error' : ''}`} {...props} />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
