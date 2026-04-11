import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`input-group ${className}`}>
      <label className="input-label">{label}</label>
      <textarea className={`input textarea ${error ? 'input-error' : ''}`} {...props} />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
