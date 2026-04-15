/**
 * Componente de botão personalizado
 * Wrapper para botões com estados de loading e disabled
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  loading, 
  disabled, 
  variant = 'primary',
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        children
      )}
    </button>
  );
}