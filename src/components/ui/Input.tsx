'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  helperText,
  icon,
  className = '',
}) => {
  const baseClasses = `
    w-full px-4 py-3 text-gray-900 dark:text-white
    bg-white dark:bg-gray-700
    border rounded-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-all duration-200
    placeholder-gray-400 dark:placeholder-gray-500
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${error 
      ? 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500'
    }
  `;

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`${baseClasses} ${icon ? 'pl-10' : ''}`}
        />
      </div>

      {/* Helper Text */}
      {helperText && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-1 text-sm text-red-600 dark:text-red-400"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input; 