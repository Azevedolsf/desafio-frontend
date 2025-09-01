import { useState } from 'react';

interface InputProps {
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
  className?: string;
  error?: string;
}

export default function Input({ 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  label,
  className = '',
  error
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full h-12 px-3 space-y-1 border border-border-input rounded-md focus:outline-none  focus:border-primary hover:border-primary hover:cursor-pointer text-sm transition-colors duration-200 ${error ? 'border-red-500' : ''} ${className}`}
        placeholder={isFocused ? '' : placeholder}
      />
      {isFocused && label && (
        <label className="absolute top-0 left-3 text-xs font-medium text-primary pointer-events-none">
          {label}
        </label>
      )}
      {error && (
        <span className="text-red-500 text-xs mt-1 block pl-1">
          {error}
        </span>
      )}
    </div>
  );
}
