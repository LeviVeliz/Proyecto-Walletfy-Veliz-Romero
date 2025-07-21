import React from 'react';

interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  rows = 3,
  className = '',
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
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