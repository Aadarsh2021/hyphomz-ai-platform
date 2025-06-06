'use client';

import { motion } from 'framer-motion';
import { Star, Sparkles, Zap, Shield } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.1
    }
  }
};

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export default function ServiceCard({ title, description, icon, gradient, features, index }: ServiceCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ 
        y: -12,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
    >
      {/* Enhanced Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15 + index * 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-2xl`}
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + index * 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr ${gradient} opacity-3 rounded-full blur-3xl`}
        />
      </div>

      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Premium Badge */}
      <div className="absolute top-4 right-4 z-10">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
        >
          <Star className="h-3 w-3" />
          Premium
        </motion.div>
      </div>

      {/* AI Enhancement Badge */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div 
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
        >
          <Sparkles className="h-3 w-3" />
          AI-Powered
        </motion.div>
      </div>
      
      <div className="relative z-10 p-8">
        {/* Enhanced Icon container */}
        <motion.div 
          className="relative mb-8"
          variants={iconVariants}
          whileHover="hover"
        >
          <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-4xl shadow-2xl relative overflow-hidden`}>
            <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
            <span className="relative z-10 text-white drop-shadow-lg">{icon}</span>
            {/* Sparkle effects */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"
            />
          </div>
          {/* Floating sparkles */}
          <motion.div
            animate={{
              y: [-5, -15, -5],
              x: [0, 5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1,
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Enhanced Content */}
        <div className="space-y-4">
          <motion.h3 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-blue-600 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            {title}
          </motion.h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base">
            {description}
          </p>

          {/* Enhanced Features list */}
          <motion.ul 
            className="space-y-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {features.map((feature, i) => (
              <motion.li 
                key={i} 
                className="flex items-center text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="mr-3 flex-shrink-0"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
                {feature}
              </motion.li>
            ))}
          </motion.ul>

          {/* Enhanced Action button */}
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-full py-4 px-6 bg-gradient-to-r ${gradient} text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group/btn`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            <div className="relative flex items-center justify-center gap-2">
              <Zap className="h-5 w-5" />
              <span>Book Now</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </motion.button>

          {/* Quality Assurance Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-2"
          >
            <Shield className="h-4 w-4 text-green-500" />
            <span>Quality Guaranteed</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 