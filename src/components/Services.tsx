'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { staggerContainer, fadeIn, scaleUp } from '@/utils/animations';
import { Brain, Clock, Star, TrendingUp, Zap, Sparkles, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useDynamicPricing } from '@/hooks/useAI';

const services = [
  {
    icon: '/icons/cleaning.svg',
    title: 'House Cleaning',
    description: 'AI-powered cleaning services with smart scheduling and eco-friendly products',
    features: ['AI-optimized deep cleaning', 'Smart maintenance schedules', 'Eco-friendly products'],
    color: 'from-green-500 to-emerald-500',
    category: 'cleaning',
    isPopular: true,
    aiFeatures: ['Duration prediction', 'Smart routing', 'Quality scoring']
  },
  {
    icon: '/icons/electrical.svg',
    title: 'Electrical',
    description: 'Smart electrical services with AI safety checks and certified electricians',
    features: ['AI-planned wiring installation', 'Smart electrical repairs', 'AI safety inspections'],
    color: 'from-yellow-500 to-amber-500',
    category: 'electrical',
    isPopular: true,
    aiFeatures: ['Safety assessment', 'Load calculation', 'Smart scheduling']
  },
  {
    icon: '/icons/hvac.svg',
    title: 'HVAC',
    description: 'Heating, ventilation, and air conditioning services',
    features: ['AC installation', 'Heating repair', 'System maintenance'],
    color: 'from-sky-500 to-blue-500',
    category: 'hvac',
    isPopular: true,
    aiFeatures: ['Energy optimization', 'Predictive maintenance', 'Efficiency analysis']
  },
  {
    icon: '/icons/plumbing.svg',
    title: 'Plumbing',
    description: 'Smart plumbing services with AI-powered diagnostics and expert repair',
    features: ['AI-assisted emergency repairs', 'Smart installation', 'Predictive leak detection'],
    color: 'from-blue-500 to-cyan-500',
    category: 'plumbing',
    isPopular: false,
    aiFeatures: ['Problem diagnosis', 'Provider matching', 'Cost estimation']
  },
  {
    icon: '/icons/security.svg',
    title: 'Home Security',
    description: 'Professional security system installation and monitoring',
    features: ['System installation', '24/7 monitoring', 'Camera setup'],
    color: 'from-purple-500 to-indigo-500',
    category: 'security',
    isPopular: false,
    aiFeatures: ['Threat assessment', 'Smart monitoring', 'Pattern recognition']
  }
];

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section id="services" className="py-32 md:py-40 bg-gradient-to-b from-gray-50/90 via-white to-gray-50/90 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/3 -left-1/3 w-2/3 h-2/3 bg-gradient-to-br from-indigo-200/10 to-purple-200/10 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-tl from-blue-200/10 to-cyan-200/10 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* AI-Enhanced Section header */}
        <motion.div variants={fadeIn} className="text-center max-w-4xl mx-auto mb-20 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain className="h-4 w-4" />
            AI-Powered Services
            <Sparkles className="h-4 w-4" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Smart Home Services</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Enhanced by AI
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Experience next-generation home services with AI-powered matching, 
            predictive scheduling, and intelligent optimization. Every service is 
            enhanced with machine learning for better results.
          </p>
        </motion.div>

        {/* Services Slider */}
        <div className="relative max-w-7xl mx-auto">
          {/* Slider Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Services</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentSlide + 1} of {services.length}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Auto-play toggle */}
              <motion.button
                onClick={toggleAutoPlay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isAutoPlaying 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
                title={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
              >
                {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </motion.button>

              {/* Navigation buttons */}
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Slider Container */}
          <div className="relative overflow-hidden rounded-3xl">
            <motion.div
              className="flex transition-all duration-500 ease-out"
              animate={{ x: `-${currentSlide * 100}%` }}
            >
              {services.map((service, index) => (
                <div key={service.title} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: index === currentSlide ? 1 : 0.7, 
                      scale: index === currentSlide ? 1 : 0.95 
                    }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    <Card variant="gradient" className="h-full flex flex-col group hover:shadow-2xl transition-all duration-500 relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-white/20 dark:border-gray-700/20">
                      {/* Popular badge */}
                      {service.isPopular && (
                        <div className="absolute top-6 right-6 z-10">
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                            <TrendingUp className="h-4 w-4" />
                            Popular Choice
                          </div>
                        </div>
                      )}

                      {/* AI badge */}
                      <div className="absolute top-6 left-6 z-10">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                          <Brain className="h-4 w-4" />
                          AI-Enhanced
                        </div>
                      </div>

                      <div className="p-8 pt-16">
                        {/* Service icon with gradient background */}
                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="w-10 h-10 text-white">
                            <Image
                              src={service.icon}
                              alt={service.title}
                              width={40}
                              height={40}
                              className="w-full h-full filter brightness-0 invert"
                            />
                          </div>
                        </div>

                        <h3 className="text-3xl font-bold mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">{service.description}</p>

                        {/* Features list */}
                        <ul className="space-y-4 mb-8">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                              <svg className="w-5 h-5 mr-4 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-base">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* AI Features */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-4 rounded-xl mb-8 border border-blue-200/50 dark:border-blue-800/50">
                          <div className="flex items-center gap-3 mb-3">
                            <Sparkles className="h-5 w-5 text-blue-600" />
                            <span className="text-base font-semibold text-blue-600 dark:text-blue-400">AI-Powered Features</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {service.aiFeatures.map((aiFeature, index) => (
                              <span 
                                key={index}
                                className="text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-full border border-blue-200 dark:border-blue-800 font-medium"
                              >
                                {aiFeature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Button 
                            fullWidth 
                            size="lg"
                            className="group-hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-4"
                          >
                            <Zap className="h-5 w-5 mr-3" />
                            Smart Book Now
                          </Button>
                          <Link href={`/services?category=${service.category}`} className="block">
                            <Button variant="outline" fullWidth size="lg" className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 text-lg py-4">
                              <Brain className="h-4 w-4 mr-3" />
                              View AI Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {services.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* AI-Enhanced Bottom CTA */}
        <motion.div
          variants={fadeIn}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-10 rounded-3xl border-2 border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-base font-bold mb-6 shadow-lg">
              <Brain className="h-5 w-5" />
              AI-Powered Platform
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Discover All Our Smart Services
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Experience the complete range of AI-enhanced home services with personalized recommendations, 
              smart scheduling, and intelligent provider matching.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/ai-demo">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
                  <Sparkles className="h-5 w-5 mr-3" />
                  Experience AI Demo
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 text-lg px-8 py-4">
                  <TrendingUp className="h-5 w-5 mr-3" />
                  Browse All Smart Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 