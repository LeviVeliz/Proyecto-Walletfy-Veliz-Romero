import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  accept?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className = '',
  accept,
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        accept={accept}
        className={`block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error 
            ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-500' 
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
        } text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};