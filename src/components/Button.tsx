import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'text' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  type = 'button',
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseClasses = "font-medium rounded-md transition-all duration-200 cursor-pointer focus:outline-none";
  
  const variantClasses = {
    primary: "px-4 py-2 bg-primary text-white hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/25",
    outline: "px-4 py-2 border border-primary text-primary bg-white hover:bg-gray-50",
    text: "px-4 py-2 text-primary bg-transparent hover:text-primary/80",
    danger: "px-4 py-2 bg-[#e22849] text-white hover:bg-[#e22849]/80 hover:shadow-lg hover:shadow-[#e22849]/25"
  };
  
  const sizeClasses = {
    sm: "text-sm px-5 py-2",
    md: "text-sm px-5 py-2", 
    lg: "text-base px-7 py-2"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
