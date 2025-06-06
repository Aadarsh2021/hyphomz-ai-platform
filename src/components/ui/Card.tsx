'use client';

import { motion } from 'framer-motion';
import { cardHover } from '@/utils/animations';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'outline';
  className?: string;
  animate?: boolean;
  onClick?: () => void;
}

const variants = {
  default: 'bg-white dark:bg-gray-800 shadow-xl',
  gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl',
  outline: 'border-2 border-gray-200 dark:border-gray-700 bg-transparent'
};

export default function Card({
  children,
  variant = 'default',
  className = '',
  animate = true,
  onClick
}: CardProps) {
  const Component = animate ? motion.div : 'div';
  
  return (
    <Component
      whileHover={animate ? cardHover : undefined}
      onClick={onClick}
      className={`
        ${variants[variant]}
        rounded-2xl p-6
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
} 