'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { useAIStatus } from '@/hooks/useAI';

interface AIStatusIndicatorProps {
  className?: string;
  showLabel?: boolean;
}

export default function AIStatusIndicator({ 
  className = '', 
  showLabel = true 
}: AIStatusIndicatorProps) {
  const { status, lastCheck } = useAIStatus();

  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          icon: Brain,
          color: 'text-green-500',
          bgColor: 'bg-green-100 dark:bg-green-900',
          label: 'AI Online',
          description: 'Smart features active'
        };
      case 'offline':
        return {
          icon: WifiOff,
          color: 'text-red-500',
          bgColor: 'bg-red-100 dark:bg-red-900',
          label: 'AI Offline',
          description: 'Basic features only'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900',
          label: 'AI Checking',
          description: 'Connecting...'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <div className={`p-2 rounded-full ${config.bgColor}`}>
        <Icon className={`h-4 w-4 ${config.color}`} />
      </div>
      
      {showLabel && (
        <div className="text-sm">
          <div className={`font-medium ${config.color}`}>
            {config.label}
          </div>
          <div className="text-xs text-gray-500">
            {config.description}
          </div>
        </div>
      )}

      {status === 'online' && (
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-2 w-2 bg-green-500 rounded-full"
        />
      )}
    </motion.div>
  );
} 