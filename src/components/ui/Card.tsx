import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};