'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
  variant?: 'gradient' | 'dots' | 'wave';
}

export default function SectionDivider({ 
  className = '', 
  variant = 'gradient' 
}: SectionDividerProps) {
  if (variant === 'dots') {
    return (
      <div className={`py-8 md:py-12 flex justify-center ${className}`}>
        <div className="flex items-center space-x-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className={`py-8 md:py-12 ${className}`}>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full overflow-hidden"
        >
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="w-full h-12 md:h-16"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M0,0V60c120,80,240,0,360,0s240,80,360,0s240-80,360,0s120,80,240,0V0Z"
              className="fill-gradient-to-r from-blue-200/30 to-purple-200/30 dark:from-blue-900/30 dark:to-purple-900/30"
            />
          </svg>
        </motion.div>
      </div>
    );
  }

  // Default gradient variant
  return (
    <div className={`py-8 md:py-12 flex justify-center ${className}`}>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-xs h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
      />
    </div>
  );
} 