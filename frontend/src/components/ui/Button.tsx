import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "btn";
  const styles = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    outline: "btn-outline",
  };

  return (
    <button className={`${baseStyle} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
