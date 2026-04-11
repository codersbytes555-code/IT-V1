import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  error?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ label, tags, onChange, error }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className={`tag-input-container ${error ? 'input-error' : ''}`}>
        {tags.map((tag, idx) => (
          <span key={idx} className="tag">
            {tag}
            <button type="button" onClick={() => removeTag(tag)}><X size={14}/></button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press enter..."
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent' }}
        />
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
