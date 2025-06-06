'use client';

import { useState } from 'react';
import ServiceCatalog from '@/components/services/ServiceCatalog';
import ServiceFilters from '@/components/services/ServiceFilters';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, slideInFromLeft, slideInFromRight } from '@/utils/animations';
import Image from 'next/image';
import SectionDivider from '@/components/ui/SectionDivider';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { Brain, Sparkles, Search, Filter, Zap, Star, Shield, TrendingUp, Clock, Users, ChevronDown, CheckCircle, Award, Heart } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <motion.main 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen overflow-x-hidden relative"
    >
      {/* Enhanced background with subtle animations */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(79, 70, 229, 0.04) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 60%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Premium Enhanced Hero Section */}
      <motion.section
        variants={sectionVariants}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50/95 via-indigo-50/90 to-blue-100/95 dark:from-gray-900/98 dark:via-gray-800/95 dark:to-indigo-900/98 pt-32 md:pt-40 pb-20 md:pb-28"
      >
        {/* Enhanced background decoration with multiple layers */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {/* Main rotating gradients */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-indigo-300/20 to-blue-300/20 dark:from-indigo-800/30 dark:to-blue-800/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-300/20 to-pink-300/20 dark:from-purple-800/30 dark:to-pink-800/30 rounded-full blur-3xl"
          />
          
          {/* Additional floating orbs */}
          <motion.div
            animate={{
              x: [0, 120, 0],
              y: [0, -60, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-cyan-300/25 to-blue-300/25 dark:from-cyan-800/35 dark:to-blue-800/35 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-l from-violet-300/25 to-purple-300/25 dark:from-violet-800/35 dark:to-purple-800/35 rounded-full blur-2xl"
          />

          {/* Enhanced floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
              className={`absolute w-3 h-3 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full blur-sm`}
              style={{
                left: `${15 + i * 12}%`,
                top: `${25 + Math.sin(i) * 15}%`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Left content */}
            <motion.div 
              variants={slideInFromLeft} 
              className="space-y-10"
            >
              {/* Premium AI Badge with enhanced animations */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-3 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-full blur-lg animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold border border-white/20 shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="h-5 w-5" />
                    </motion.div>
                    <span>AI-Enhanced Services</span>
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
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    style={{
                      backgroundSize: "200% 200%"
                    }}
                  >
                    Professional
                  </motion.span>
                  <span className="block text-gray-900 dark:text-white mt-2">Home Services</span>
                  <motion.span 
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-5xl md:text-6xl lg:text-7xl mt-2"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    style={{
                      backgroundSize: "200% 200%"
                    }}
                  >
                    Made Smart
                  </motion.span>
                </h1>
              </motion.div>
              
              {/* Enhanced description with feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed">
                  Discover our comprehensive range of intelligent home services with AI-powered matching and instant availability.
                </p>
                
                <div className="flex flex-wrap gap-4 text-lg">
                  <motion.span 
                    className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Smart Filtering
                  </motion.span>
                  <motion.span 
                    className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Instant Matching
                  </motion.span>
                  <motion.span 
                    className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Quality Guaranteed
                  </motion.span>
                </div>
              </motion.div>

              {/* Enhanced scroll indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
              >
                <span className="text-sm font-medium">Scroll to explore services</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </motion.div>

              {/* Enhanced Trust Indicators with premium animations */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="grid grid-cols-3 gap-8 pt-12 border-t-2 border-gradient-to-r from-indigo-200/50 via-blue-200/50 to-purple-200/50 dark:border-gray-700/50"
              >
                {[
                  { number: "50+", label: "AI-Enhanced Services", gradient: "from-indigo-600 to-blue-600", icon: Shield, delay: 0 },
                  { number: "8", label: "Smart Categories", gradient: "from-blue-600 to-purple-600", icon: Filter, delay: 0.1 },
                  { number: "24/7", label: "AI Support", gradient: "from-purple-600 to-indigo-600", icon: Clock, delay: 0.2 }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.2 + stat.delay, duration: 0.6 }}
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
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
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

            {/* Enhanced Right content - Service Hero Image with premium effects */}
            <motion.div
              variants={slideInFromRight}
              className="relative lg:pl-8"
            >
              <div className="relative aspect-square max-w-2xl mx-auto">
                {/* Enhanced background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-blue-500/10 to-purple-500/20 dark:from-indigo-500/30 dark:via-blue-500/20 dark:to-purple-500/30 rounded-3xl blur-2xl scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 dark:from-blue-600/20 dark:to-purple-600/20 rounded-3xl" />
                
                <Image
                  src="/images/service-hero.png"
                  alt="Professional home services"
                  width={700}
                  height={700}
                  className="rounded-3xl object-cover w-full h-full shadow-2xl relative z-10 border border-white/20 dark:border-gray-700/50"
                  priority
                />
                
                {/* Enhanced floating service badge */}
                <motion.div
                  animate={{
                    y: [-12, 12],
                    rotate: [-2, 2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -bottom-8 -right-8 bg-gradient-to-r from-green-500 to-emerald-600 p-1 rounded-3xl shadow-2xl backdrop-blur-sm z-20"
                >
                  <div className="bg-white/95 dark:bg-gray-800/95 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Shield className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <div className="font-bold text-xl text-gray-900 dark:text-white">Quality Assured</div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">Verified Providers</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* New floating element - Service Count */}
                <motion.div
                  animate={{
                    y: [10, -10],
                    rotate: [2, -2]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                  className="absolute -top-8 -left-8 bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-3xl shadow-2xl backdrop-blur-sm z-20"
                >
                  <div className="bg-white/95 dark:bg-gray-800/95 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg"
                        whileHover={{ scale: 1.1, rotate: -360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Star className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <div className="font-bold text-xl text-gray-900 dark:text-white">50+ Services</div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">AI-Enhanced</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* New floating element - Satisfaction Rate */}
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
                        className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <TrendingUp className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">98% Satisfaction</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Customer Rating</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* New floating element - Active Users */}
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
                        <div className="font-bold text-gray-900 dark:text-white">15K+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <SectionDivider variant="gradient" />

      {/* Enhanced Services Content */}
      <motion.section
        variants={sectionVariants}
        className="py-32 md:py-40 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-800/90 dark:via-gray-900/80 dark:to-gray-800/90 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/3 -left-1/3 w-2/3 h-2/3 bg-gradient-to-br from-indigo-200/10 to-blue-200/10 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-tl from-purple-200/10 to-pink-200/10 dark:from-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Search className="h-4 w-4" />
              Smart Service Discovery
              <Filter className="h-4 w-4" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Find Your Perfect</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
                Service Match
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Use our intelligent filtering system to discover services tailored to your needs. 
              Advanced search, category filtering, and AI-powered recommendations make finding 
              the right service effortless.
            </p>
          </motion.div>
        {/* Filters and Services */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ServiceFilters
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
              searchQuery={searchQuery}
              onCategoryChange={setSelectedCategory}
              onPriceChange={setSelectedPrice}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Service Catalog */}
          <div className="lg:col-span-2">
            <ServiceCatalog
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
              searchQuery={searchQuery}
            />
          </div>
        </div>
        </div>
      </motion.section>
      
      <ScrollToTop />

      {/* Enhanced Premium Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-32 md:py-40 bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/90 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-indigo-900/95 relative overflow-hidden"
      >
        {/* Enhanced background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-indigo-300/15 to-blue-300/15 dark:from-indigo-800/20 dark:to-blue-800/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-300/15 to-pink-300/15 dark:from-purple-800/20 dark:to-pink-800/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8">
              <Shield className="h-4 w-4" />
              Premium Features
              <Award className="h-4 w-4" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="text-gray-900 dark:text-white">Why Choose Our</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
                Smart Services?
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of home services with AI-powered matching, certified professionals, 
              and guaranteed satisfaction backed by cutting-edge technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Matching",
                description: "Our intelligent algorithm analyzes your needs and preferences to connect you with the perfect service provider in seconds.",
                color: "from-purple-500 to-indigo-500",
                bgColor: "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
                stats: "99.2% Match Success"
              },
              {
                icon: Shield,
                title: "Verified Professionals",
                description: "Every service provider is thoroughly vetted, background-checked, and certified to ensure the highest quality standards.",
                color: "from-green-500 to-emerald-500",
                bgColor: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
                stats: "500+ Certified Pros"
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Round-the-clock support and emergency services available. Book anytime, get help whenever you need it.",
                color: "from-blue-500 to-cyan-500",
                bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
                stats: "Under 30min Response"
              },
              {
                icon: Star,
                title: "Quality Guarantee",
                description: "100% satisfaction guarantee with our work. If you're not happy, we'll make it right or refund your money.",
                color: "from-yellow-500 to-amber-500",
                bgColor: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
                stats: "98.7% Satisfaction Rate"
              },
              {
                icon: TrendingUp,
                title: "Smart Pricing",
                description: "Dynamic pricing powered by AI ensures you get the best value. No hidden fees, transparent pricing always.",
                color: "from-red-500 to-pink-500",
                bgColor: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
                stats: "30% Cost Savings"
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Join thousands of satisfied customers. Rate, review, and help build our trusted service community.",
                color: "from-indigo-500 to-purple-500",
                bgColor: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
                stats: "15K+ Happy Customers"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Enhanced glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                />
                
                <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.bgColor} border-2 border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-2xl transition-all duration-500 h-full backdrop-blur-sm`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl`} />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/30 to-transparent rounded-full blur-2xl" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${feature.color} text-white px-4 py-2 rounded-full text-sm font-bold`}>
                      <CheckCircle className="h-4 w-4" />
                      <span>{feature.stats}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <SectionDivider variant="gradient" />

      {/* Enhanced Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-32 md:py-40 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-800/90 dark:via-gray-900/80 dark:to-gray-800/90 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-200/8 to-blue-200/8 dark:from-indigo-900/8 dark:to-blue-900/8 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8">
              <Star className="h-4 w-4" />
              Customer Stories
              <Heart className="h-4 w-4" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="text-gray-900 dark:text-white">What Our</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
                Customers Say
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what real customers say about their experience 
              with our AI-enhanced home services platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Homeowner",
                image: "/images/avatar-1.jpg",
                rating: 5,
                testimonial: "The AI matching system found me the perfect cleaning service in minutes! The quality was exceptional and the booking process was seamless. Highly recommend!",
                service: "House Cleaning",
                color: "from-green-500 to-emerald-500"
              },
              {
                name: "Mike Chen",
                role: "Property Manager",
                image: "/images/avatar-2.jpg",
                rating: 5,
                testimonial: "As a property manager, I need reliable services fast. This platform's 24/7 availability and verified professionals have been a game-changer for emergency repairs.",
                service: "Plumbing Repair",
                color: "from-blue-500 to-cyan-500"
              },
              {
                name: "Emily Rodriguez",
                role: "Busy Parent",
                image: "/images/avatar-3.jpg",
                rating: 5,
                testimonial: "Being a working mom, I barely have time to research services. The smart recommendations and instant booking feature saved me hours of time!",
                service: "Lawn Care",
                color: "from-purple-500 to-pink-500"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Enhanced glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${testimonial.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 5, repeat: Infinity, delay: index * 0.8 }}
                />
                
                <div className="relative p-8 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-2xl transition-all duration-500 h-full backdrop-blur-sm">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-3xl`} />
                  </div>

                  <div className="relative z-10">
                    {/* Rating stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-lg">
                      "{testimonial.testimonial}"
                    </blockquote>

                    {/* Service badge */}
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${testimonial.color} text-white px-4 py-2 rounded-full text-sm font-bold mb-6`}>
                      <CheckCircle className="h-4 w-4" />
                      <span>{testimonial.service}</span>
                    </div>

                    {/* Customer info */}
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center shadow-lg"
                      >
                        <Users className="h-6 w-6 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "15K+", label: "Happy Customers", icon: Users },
                { number: "98.7%", label: "Satisfaction Rate", icon: Star },
                { number: "500+", label: "Verified Pros", icon: Shield },
                { number: "24/7", label: "Support", icon: Clock }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg mb-4"
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.main>
  );
} 