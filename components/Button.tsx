
import React, { ReactNode } from 'react';
import { SpinnerIcon } from './Icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ isLoading, icon, children, className, ...props }) => {
  const baseClasses = "text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out flex items-center justify-center text-base transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  return (
    <button
      className={`${baseClasses} ${className || ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <SpinnerIcon className="animate-spin h-5 w-5 text-white mr-3" />
      ) : (
        icon && <span className="mr-3">{icon}</span> 
      )}
      {children}
    </button>
  );
};
