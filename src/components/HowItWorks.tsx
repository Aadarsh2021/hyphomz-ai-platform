'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { staggerContainer, fadeIn, scaleUp } from '@/utils/animations';
import Card from './ui/Card';
import Image from 'next/image';
import { CheckCircle, Clock, Users, Shield, ArrowRight, Play, MousePointer, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: '/icons/cleaning.svg',
    title: 'Smart Search & Book',
    subtitle: '30 seconds',
    description: 'Use our AI-powered search to find the perfect service. Choose your preferred time slot and get instant confirmation.',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    features: ['AI-powered matching', 'Instant booking', 'Real-time availability'],
    icon2: MousePointer
  },
  {
    icon: '/icons/electrical.svg',
    title: 'Expert Assignment',
    subtitle: '2 minutes',
    description: 'Our intelligent system matches you with the best verified professional based on your specific requirements and location.',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
    features: ['Verified professionals', 'Smart matching', 'Background checks'],
    icon2: Users
  },
  {
    icon: '/icons/plumbing.svg',
    title: 'Quick Arrival',
    subtitle: '15-30 mins',
    description: 'Your assigned professional arrives promptly with all necessary tools and equipment. Track their location in real-time.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    features: ['Real-time tracking', 'Equipped professionals', 'Punctual service'],
    icon2: Clock
  },
  {
    icon: '/icons/security.svg',
    title: 'Quality Service',
    subtitle: 'Guaranteed',
    description: 'Enjoy professional service delivery with our 100% satisfaction guarantee and comprehensive quality assurance.',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
    features: ['100% satisfaction', 'Quality assurance', 'Money-back guarantee'],
    icon2: Shield
  }
];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const startAnimation = () => {
    setIsPlaying(true);
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % steps.length;
      setActiveStep(currentStep);
      if (currentStep === 0) {
        setIsPlaying(false);
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <section id="how-it-works" className="py-32 md:py-40 bg-gradient-to-b from-white via-gray-50/70 to-white dark:from-gray-800/90 dark:via-gray-900/80 dark:to-gray-800/90 overflow-hidden relative">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-6 relative"
      >
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-200/15 to-purple-200/15 dark:from-indigo-900/15 dark:to-purple-900/15 rounded-full blur-3xl"
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
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-200/15 to-cyan-200/15 dark:from-blue-900/15 dark:to-cyan-900/15 rounded-full blur-3xl"
          />
          
          {/* Additional floating elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-lg"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-xl blur-lg"
          />
        </div>

        {/* Enhanced Section header */}
        <motion.div variants={fadeIn} className="text-center max-w-4xl mx-auto mb-20 md:mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg"
          >
            <Sparkles className="h-4 w-4" />
            How It Works
            <ArrowRight className="h-4 w-4" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-black mb-8"
          >
            <span className="text-gray-900 dark:text-white">Simple</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
              4-Step Process
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Experience seamless home services in four simple steps. From booking to completion, 
            our AI-powered platform ensures quality service delivery at your convenience.
          </motion.p>

          {/* Interactive demo button */}
          <motion.button
            onClick={startAnimation}
            disabled={isPlaying}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              isPlaying 
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl'
            }`}
          >
            <Play className={`h-5 w-5 ${isPlaying ? 'animate-spin' : ''}`} />
            {isPlaying ? 'Playing Demo...' : 'Watch Demo'}
          </motion.button>
        </motion.div>

        {/* Enhanced Steps */}
        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-16"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              className="relative cursor-pointer"
              onClick={() => handleStepClick(index)}
              whileHover={{ y: -10 }}
            >
              {/* Enhanced Connector line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-1/2 left-full w-full z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="h-1 bg-gradient-to-r from-gray-200 via-blue-300 to-transparent dark:from-gray-700 dark:via-blue-600 rounded-full -translate-y-1/2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      animate={{
                        x: activeStep > index ? '0%' : '-100%'
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    animate={{
                      scale: activeStep > index ? 1.2 : 0.8,
                      opacity: activeStep > index ? 1 : 0.5
                    }}
                  />
                </motion.div>
              )}

              <Card 
                variant="gradient" 
                className={`relative z-10 h-full transition-all duration-500 border-2 ${
                  activeStep === index 
                    ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-105' 
                    : 'border-transparent hover:border-blue-300/30'
                }`}
              >
                {/* Enhanced Step number */}
                <motion.div 
                  className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center shadow-xl border-2 border-white dark:border-gray-600"
                  animate={{
                    scale: activeStep === index ? 1.2 : 1,
                    rotate: activeStep === index ? 360 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className={`text-lg font-black ${
                    activeStep === index 
                      ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {index + 1}
                  </span>
                </motion.div>

                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-2xl opacity-50`} />

                <div className="relative p-6">
                  {/* Dual icons */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                      animate={{
                        scale: activeStep === index ? 1.1 : 1,
                        rotate: activeStep === index ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={step.icon}
                        alt={step.title}
                        width={32}
                        height={32}
                        className="text-white filter brightness-0 invert"
                      />
                    </motion.div>
                    
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg opacity-80`}
                      animate={{
                        scale: activeStep === index ? 1.1 : 0.9,
                        opacity: activeStep === index ? 1 : 0.6
                      }}
                    >
                      <step.icon2 className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${step.color} text-white`}>
                        <Clock className="h-3 w-3" />
                        {step.subtitle}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>

                    {/* Features list */}
                    <ul className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Active step indicator */}
                <motion.div
                  className={`absolute bottom-0 left-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${step.color} -translate-x-1/2 translate-y-1/2 shadow-lg`}
                  animate={{
                    scale: activeStep === index ? [1, 1.5, 1] : 1,
                    boxShadow: activeStep === index 
                      ? "0 0 20px rgba(59, 130, 246, 0.5)" 
                      : "0 0 0px rgba(59, 130, 246, 0)"
                  }}
                  transition={{
                    duration: activeStep === index ? 2 : 0.3,
                    repeat: activeStep === index ? Infinity : 0
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { number: "10K+", label: "Happy Customers", color: "from-blue-600 to-cyan-600" },
            { number: "99.8%", label: "Success Rate", color: "from-green-600 to-emerald-600" },
            { number: "15 min", label: "Average Response", color: "from-purple-600 to-pink-600" },
            { number: "24/7", label: "Support Available", color: "from-orange-600 to-red-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-2`}
                animate={{
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Bottom decoration */}
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl"
        />
      </motion.div>
    </section>
  );
} 