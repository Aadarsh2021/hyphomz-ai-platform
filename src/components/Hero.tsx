'use client';

import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, slideInFromLeft, slideInFromRight } from '@/utils/animations';
import { Brain, Sparkles, Clock, Star, TrendingUp, Zap, Shield, Award, Users, ChevronRight, CheckCircle } from 'lucide-react';
import Button from './ui/Button';
import Image from 'next/image';
import AIStatusIndicator from './ai/AIStatusIndicator';
import { useSmartSearch, useAIStatus } from '@/hooks/useAI';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Hero() {
  const { status } = useAIStatus();
  const { scrollToSection } = useSmoothScroll();
  
  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50/95 via-blue-50/90 to-indigo-100/95 dark:from-gray-900/98 dark:via-gray-800/95 dark:to-indigo-900/98 pt-32 md:pt-40 pb-20 md:pb-28"
    >
      {/* Enhanced animated background patterns with multiple layers */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Main rotating gradients */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-indigo-300/20 to-blue-300/20 dark:from-indigo-800/30 dark:to-blue-800/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-purple-300/20 to-pink-300/20 dark:from-purple-800/30 dark:to-pink-800/30 rounded-full blur-3xl"
        />
        
        {/* Additional floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-300/30 to-blue-300/30 dark:from-cyan-800/40 dark:to-blue-800/40 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-l from-violet-300/30 to-purple-300/30 dark:from-violet-800/40 dark:to-purple-800/40 rounded-full blur-2xl"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Left content */}
          <motion.div variants={slideInFromLeft} className="space-y-10">
            {/* Premium AI Badge with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-3 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-lg animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold border border-white/20 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="h-5 w-5" />
                  </motion.div>
                  <span>AI-Powered Platform</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced heading with improved typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
                <motion.span 
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                  Smart Home
                </motion.span>
                <span className="block text-gray-900 dark:text-white mt-2">Services</span>
                <motion.span 
                  className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-5xl md:text-6xl lg:text-7xl mt-2"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                  Powered by AI
                </motion.span>
              </h1>
            </motion.div>
            
            {/* Enhanced description with highlighted keywords */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-4"
            >
              <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed">
                Experience the future of home services with our revolutionary AI-powered platform.
              </p>
              <div className="flex flex-wrap gap-4 text-lg">
                <motion.span 
                  className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle className="h-4 w-4" />
                  Personalized Recommendations
                </motion.span>
                <motion.span 
                  className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle className="h-4 w-4" />
                  Smart Provider Matching
                </motion.span>
                <motion.span 
                  className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle className="h-4 w-4" />
                  Intelligent Scheduling
                </motion.span>
              </div>
            </motion.div>

            {/* Enhanced Action Buttons with premium effects */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('services')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 transform transition-all duration-300 text-lg px-10 py-5 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="relative flex items-center gap-3">
                    <Zap className="h-6 w-6" />
                    <span className="font-bold">Explore Services</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.div>
                  </div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection('recommendations')}
                  className="border-3 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-5"
                >
                  <div className="flex items-center gap-3">
                    <Brain className="h-6 w-6" />
                    <span className="font-bold">AI Recommendations</span>
                  </div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced AI Status with premium styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl blur-lg"></div>
              <div className="relative">
                <AIStatusIndicator />
              </div>
            </motion.div>
            
            {/* Enhanced Trust Indicators with premium animations */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t-2 border-gradient-to-r from-blue-200/50 via-purple-200/50 to-pink-200/50 dark:border-gray-700/50"
            >
              {[
                { number: "1000+", label: "AI-Matched Services", gradient: "from-blue-600 to-cyan-600", icon: Shield, delay: 0 },
                { number: "4.9/5", label: "Customer Rating", gradient: "from-purple-600 to-pink-600", icon: Star, delay: 0.1 },
                { number: "95%", label: "AI Accuracy", gradient: "from-indigo-600 to-blue-600", icon: TrendingUp, delay: 0.2 },
                { number: "24/7", label: "AI Support", gradient: "from-green-600 to-blue-600", icon: Clock, delay: 0.3 }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.4 + stat.delay, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="relative mb-3">
                    <motion.div
                      className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                  <motion.div 
                    className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} mb-2`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Right content - Image with premium effects */}
          <motion.div
            variants={slideInFromRight}
            className="relative lg:pl-8"
          >
            <div className="relative aspect-square max-w-2xl mx-auto">
              {/* Enhanced background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-blue-500/10 to-purple-500/20 dark:from-indigo-500/30 dark:via-blue-500/20 dark:to-purple-500/30 rounded-3xl blur-2xl scale-110" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 dark:from-blue-600/20 dark:to-purple-600/20 rounded-3xl" />
              
              <Image
                src="/images/hero.png"
                alt="Professional home service"
                width={700}
                height={700}
                className="rounded-3xl object-cover w-full h-full shadow-2xl relative z-10 border border-white/20 dark:border-gray-700/50"
                priority
              />
              
              {/* Enhanced AI-Powered Floating Cards with premium animations */}
              <motion.div
                animate={{
                  y: [-15, 15],
                  rotate: [-2, 2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -bottom-8 -left-8 bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-3xl shadow-2xl backdrop-blur-sm z-20"
              >
                <div className="bg-white/95 dark:bg-gray-800/95 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Brain className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <div className="font-bold text-xl text-gray-900 dark:text-white">AI-Powered</div>
                      <div className="text-gray-600 dark:text-gray-400 font-medium">Smart Matching</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced AI Accuracy Card */}
              <motion.div
                animate={{
                  y: [15, -15],
                  rotate: [2, -2]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
                className="absolute -top-8 -right-8 bg-gradient-to-r from-green-500 to-blue-600 p-1 rounded-3xl shadow-2xl backdrop-blur-sm z-20"
              >
                <div className="bg-white/95 dark:bg-gray-800/95 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl shadow-lg"
                      whileHover={{ scale: 1.1, rotate: -360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <TrendingUp className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <div className="font-bold text-xl text-gray-900 dark:text-white">95% Accuracy</div>
                      <div className="text-gray-600 dark:text-gray-400 font-medium">ML Predictions</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Real-time AI Status */}
              <motion.div
                animate={{
                  x: [-8, 8],
                  y: [-5, 5],
                  rotate: [-3, 3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute top-1/2 -left-16 bg-gradient-to-r from-purple-500 to-pink-600 p-1 rounded-2xl shadow-xl backdrop-blur-sm z-20"
              >
                <div className="bg-white/95 dark:bg-gray-800/95 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className={`w-4 h-4 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'} shadow-lg`}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        boxShadow: status === 'online' 
                          ? ["0 0 0 0 rgba(34, 197, 94, 0.7)", "0 0 0 10px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"]
                          : ["0 0 0 0 rgba(239, 68, 68, 0.7)", "0 0 0 10px rgba(239, 68, 68, 0)", "0 0 0 0 rgba(239, 68, 68, 0)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="font-bold text-gray-900 dark:text-white">
                      AI {status === 'online' ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* New floating element - User satisfaction */}
              <motion.div
                animate={{
                  y: [8, -8],
                  x: [3, -3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
                className="absolute bottom-1/3 -right-12 bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded-2xl shadow-xl backdrop-blur-sm z-20"
              >
                <div className="bg-white/95 dark:bg-gray-800/95 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Users className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">10K+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Happy Users</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 