'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Brain, 
  Play, 
  Pause,
  Sparkles, 
  Zap, 
  Eye, 
  Target, 
  Clock, 
  BarChart3, 
  Bot, 
  Cpu, 
  Database, 
  Network,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Activity,
  Layers,
  Settings,
  Lightbulb,
  Globe,
  Shield,
  Users,
  Star,
  Rocket
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AIStatusIndicator from '@/components/ai/AIStatusIndicator';

// AI Demo scenarios and data
const aiScenarios = [
  {
    id: 'recommendation',
    title: 'Smart Recommendations',
    description: 'AI analyzes your history and preferences',
    icon: Sparkles,
    color: 'from-purple-600 to-pink-600',
    confidence: 95,
    result: 'Deep House Cleaning',
    details: 'Based on your 3BR home, pet ownership, and seasonal patterns'
  },
  {
    id: 'prediction',
    title: 'Duration Prediction',
    description: 'ML algorithms predict accurate service times',
    icon: Clock,
    color: 'from-blue-600 to-cyan-600',
    confidence: 92,
    result: '2h 25m ±15min',
    details: 'Calculated from 10,000+ similar service records'
  },
  {
    id: 'pricing',
    title: 'Dynamic Pricing',
    description: 'Real-time pricing optimization',
    icon: TrendingUp,
    color: 'from-green-600 to-emerald-600',
    confidence: 89,
    result: '$85-95',
    details: 'Optimized for demand, location, and service complexity'
  },
  {
    id: 'matching',
    title: 'Provider Matching',
    description: 'AI matches you with ideal service providers',
    icon: Target,
    color: 'from-orange-600 to-red-600',
    confidence: 97,
    result: 'Sarah M. (4.9★)',
    details: 'Perfect match based on skills, location, and availability'
  }
];

const aiStats = [
  { label: 'AI Accuracy', value: '99.2%', icon: Target, trend: '+2.1%' },
  { label: 'Processing Speed', value: '47ms', icon: Zap, trend: '-15ms' },
  { label: 'Data Points', value: '2.4M+', icon: Database, trend: '+500K' },
  { label: 'ML Models', value: '12', icon: Bot, trend: '+3' }
];

const neuralLayers = [
  { name: 'Input Layer', nodes: 128, active: false },
  { name: 'Hidden Layer 1', nodes: 256, active: false },
  { name: 'Hidden Layer 2', nodes: 512, active: false },
  { name: 'Hidden Layer 3', nodes: 256, active: false },
  { name: 'Output Layer', nodes: 64, active: false }
];

export default function AIDemoPage() {
  const [demoActive, setDemoActive] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [processingStage, setProcessingStage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [neurons, setNeurons] = useState(neuralLayers);
  const [realTimeData, setRealTimeData] = useState({
    requests: 0,
    processing: 0,
    completed: 0
  });
  
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-cycle through scenarios when demo is active
  useEffect(() => {
    if (demoActive) {
      const interval = setInterval(() => {
        setCurrentScenario((prev) => (prev + 1) % aiScenarios.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [demoActive]);

  // Neural network animation
  useEffect(() => {
    if (demoActive) {
      const interval = setInterval(() => {
        setNeurons(prev => prev.map((layer, idx) => ({
          ...layer,
          active: idx === ((Date.now() / 500) % prev.length | 0)
        })));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [demoActive]);

  // Real-time data simulation
  useEffect(() => {
    if (demoActive) {
      const interval = setInterval(() => {
        setRealTimeData(prev => ({
          requests: prev.requests + Math.floor(Math.random() * 3) + 1,
          processing: Math.floor(Math.random() * 15) + 5,
          completed: prev.completed + Math.floor(Math.random() * 2) + 1
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [demoActive]);

  // Processing stages animation
  useEffect(() => {
    if (demoActive) {
      const interval = setInterval(() => {
        setProcessingStage((prev) => (prev + 1) % 5);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [demoActive]);

  const startDemo = () => {
    setDemoActive(true);
    setRealTimeData({ requests: 0, processing: 0, completed: 0 });
  };

  const stopDemo = () => {
    setDemoActive(false);
    setCurrentScenario(0);
    setProcessingStage(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Interactive Background */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        {/* Dynamic gradient background */}
        <motion.div
          style={{ y: y1 }}
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 60%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/80 to-purple-100/90 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950"
        />

        {/* Interactive mouse follower */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 30 + window.innerWidth / 2 - 192,
            y: mousePosition.y * 30 + window.innerHeight / 2 - 192,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200
          }}
        />

        {/* AI Neural Network Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5" viewBox="0 0 1000 800">
          {/* Neural connections */}
          {Array.from({ length: 20 }, (_, i) => (
            <motion.line
              key={i}
              x1={100 + i * 40}
              y1={200 + (i % 3) * 150}
              x2={300 + i * 35}
              y2={250 + (i % 4) * 100}
              stroke="currentColor"
              strokeWidth="1"
              className="text-purple-500"
              animate={{
                opacity: demoActive ? [0.2, 0.8, 0.2] : 0.2,
                strokeWidth: demoActive ? [1, 2, 1] : 1
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
          
          {/* Neural nodes */}
          {Array.from({ length: 15 }, (_, i) => (
            <motion.circle
              key={i}
              cx={150 + i * 60}
              cy={300 + (i % 2) * 200}
              r="4"
              fill="currentColor"
              className="text-blue-500"
              animate={{
                opacity: demoActive ? [0.3, 1, 0.3] : 0.3,
                scale: demoActive ? [1, 1.5, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </svg>

        {/* Floating AI particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60"
            style={{
              left: `${15 + i * 3.5}%`,
              top: `${20 + (i % 5) * 15}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 6 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-sm font-bold border border-white/20 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: demoActive ? [0, 360] : 0 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="h-6 w-6" />
                  </motion.div>
                  <span className="text-lg">Hyphomz AI Intelligence</span>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-6 w-6" />
                  </motion.div>
                </div>
                {demoActive && (
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-7xl font-black mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 dark:from-white dark:via-purple-400 dark:to-blue-400">
                AI Demo
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Experience the future of home services powered by cutting-edge AI technology.
              <br />
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                Real-time intelligence, personalized experiences.
              </span>
            </motion.p>

            {/* AI Status and Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <AIStatusIndicator className="mb-4" />
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
          <Button
                  onClick={demoActive ? stopDemo : startDemo}
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-8 py-4 text-lg font-bold shadow-2xl relative overflow-hidden"
                  size="lg"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{
                      x: demoActive ? ['-100%', '100%'] : '-100%'
                    }}
                    transition={{
                      duration: 2,
                      repeat: demoActive ? Infinity : 0,
                      ease: "linear"
                    }}
                  />
                  <div className="relative flex items-center gap-3">
                    {demoActive ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                    {demoActive ? 'Stop AI Demo' : 'Start AI Demo'}
                    <Rocket className="h-6 w-6" />
                  </div>
          </Button>
              </motion.div>
            </motion.div>
        </motion.div>

          {/* AI Statistics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {aiStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative"
              >
                <Card className="p-6 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                    {demoActive ? (
                      <motion.span
                        key={stat.value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {stat.value}
                      </motion.span>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</div>
                  {demoActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xs text-green-600 dark:text-green-400 font-semibold"
                    >
                      {stat.trend}
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Demo Area */}
          <AnimatePresence>
            {demoActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-12"
              >
                {/* AI Processing Pipeline */}
                <Card className="p-8 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
                  <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Cpu className="h-8 w-8 text-purple-600" />
                    </motion.div>
                    AI Processing Pipeline
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    {['Data Input', 'Feature Extraction', 'ML Processing', 'Pattern Analysis', 'Result Output'].map((stage, idx) => (
                      <motion.div
                        key={stage}
                        className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                          processingStage === idx
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-purple-500 shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                        }`}
                        animate={{
                          scale: processingStage === idx ? 1.05 : 1,
                          y: processingStage === idx ? -5 : 0
                        }}
                      >
                        <div className="text-center">
                          <div className="text-sm font-semibold">{stage}</div>
                          {processingStage === idx && (
                            <motion.div
                              className="mt-2 flex justify-center"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Activity className="h-4 w-4" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Neural Network Visualization */}
                  <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Network className="h-6 w-6 text-blue-600" />
                      Neural Network Activity
              </h3>
                    <div className="space-y-3">
                      {neurons.map((layer, idx) => (
                        <div key={layer.name} className="flex items-center gap-4">
                          <div className="w-32 text-sm font-medium">{layer.name}</div>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                layer.active 
                                  ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                                  : 'bg-gray-400 dark:bg-gray-600'
                              }`}
                              animate={{
                                width: layer.active ? '100%' : '60%',
                                boxShadow: layer.active ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none'
                              }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 w-16">
                            {layer.nodes} nodes
                          </div>
                        </div>
                      ))}
                    </div>
              </div>
            </Card>

                {/* AI Scenarios Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Current Scenario Display */}
                  <Card className="p-8 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <Eye className="h-7 w-7 text-green-600" />
                      Active AI Analysis
                    </h2>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentScenario}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        {(() => {
                          const scenario = aiScenarios[currentScenario];
                          return (
                            <>
                              <div className="flex items-center gap-4">
                                <div className={`p-4 bg-gradient-to-r ${scenario.color} rounded-xl`}>
                                  <scenario.icon className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold">{scenario.title}</h3>
                                  <p className="text-gray-600 dark:text-gray-400">{scenario.description}</p>
                                </div>
                              </div>

                              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Confidence Level
                                  </span>
                                  <span className="text-lg font-bold text-green-600">
                                    {scenario.confidence}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                                  <motion.div
                                    className="h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${scenario.confidence}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                  />
                                </div>
                                
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    Result: {scenario.result}
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {scenario.details}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </motion.div>
                    </AnimatePresence>
                  </Card>

                  {/* Real-time Analytics */}
                  <Card className="p-8 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <BarChart3 className="h-7 w-7 text-blue-600" />
                      Real-time Analytics
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">{realTimeData.requests}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Requests</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                          <div className="text-2xl font-bold text-yellow-600">{realTimeData.processing}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Processing</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                          <div className="text-2xl font-bold text-green-600">{realTimeData.completed}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Activity className="h-5 w-5 text-purple-600" />
                          Live Processing Queue
                        </h4>
                        {['Smart recommendation analysis', 'Duration prediction model', 'Dynamic pricing calculation', 'Provider matching algorithm'].map((task, idx) => (
                          <motion.div
                            key={task}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            animate={{
                              backgroundColor: idx === processingStage % 4 
                                ? ['rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.1)']
                                : undefined
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <div className={`w-3 h-3 rounded-full ${
                              idx === processingStage % 4 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`} />
                            <span className="text-sm">{task}</span>
                            {idx === processingStage % 4 && (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Settings className="h-4 w-4 text-purple-600" />
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>

                {/* AI Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: Lightbulb, title: 'Smart Insights', desc: 'Predictive analytics and trend analysis' },
                    { icon: Globe, title: 'Global Learning', desc: 'Continuous improvement from worldwide data' },
                    { icon: Shield, title: 'Privacy First', desc: 'Advanced encryption and data protection' },
                    { icon: Users, title: 'Personalization', desc: 'Tailored experiences for every user' }
                  ].map((capability, idx) => (
                    <motion.div
                      key={capability.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="group"
                    >
                      <Card className="p-6 h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
                        <div className="flex flex-col items-center text-center">
                          <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            <capability.icon className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-lg font-bold mb-2">{capability.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {capability.desc}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-16 text-center"
          >
            <Card className="p-12 bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-200/50 dark:border-purple-700/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience AI-Powered Services?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust our AI to deliver exceptional home service experiences.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 text-lg font-bold shadow-xl"
                  size="lg"
                >
                  <span className="flex items-center gap-3">
                    Get Started with AI
                    <ArrowRight className="h-6 w-6" />
                  </span>
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 