'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Star, 
  ArrowRight,
  Brain,
  Zap,
  Target,
  BarChart3,
  Users,
  ChevronRight,
  Cpu,
  Activity,
  Eye,
  MousePointer
} from 'lucide-react';
import { usePersonalizedRecommendations, useTrendingServices } from '@/hooks/useAI';
import { aiUtils } from '@/lib/ai-api';

interface SmartRecommendationsProps {
  userId?: string;
  location?: string;
  className?: string;
}

export default function SmartRecommendations({ 
  userId = 'user_demo', 
  location = 'Greater Noida',
  className = ''
}: SmartRecommendationsProps) {
  const { recommendations, loading: recLoading } = usePersonalizedRecommendations(userId, location);
  const { trending, loading: trendLoading } = useTrendingServices();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'personalized' | 'trending' | 'insights'>('personalized');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Floating particles
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  const handleServiceClick = (serviceName: string) => {
    console.log('Navigate to:', serviceName);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  if (recLoading && trendLoading) {
    return (
      <section className={`py-28 md:py-32 ${className}`}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div 
              className="animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="h-12 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 to-purple-800 rounded-xl w-80 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto mb-12"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i} 
                    className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 to-gray-700 rounded-2xl"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  const mockInsights = [
    {
      title: "Peak Demand Hours",
      value: "10AM - 2PM",
      trend: "+15%",
      icon: Activity,
      color: "blue"
    },
    {
      title: "User Satisfaction",
      value: "98.5%",
      trend: "+2.3%",
      icon: Star,
      color: "green"
    },
    {
      title: "Response Time",
      value: "< 30 mins",
      trend: "-12%",
      icon: Zap,
      color: "purple"
    },
    {
      title: "Active Providers",
      value: "1,247",
      trend: "+8%",
      icon: Users,
      color: "orange"
    }
  ];

  return (
    <section 
      id="recommendations" 
      className={`py-32 md:py-40 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-gray-900 dark:via-blue-950/30 dark:to-indigo-950/40 relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic gradient orbs */}
        <motion.div
          className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-indigo-400/20 dark:from-blue-600/20 dark:via-purple-600/15 dark:to-indigo-600/20 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-1/3 -left-1/3 w-2/3 h-2/3 bg-gradient-to-tr from-cyan-400/20 via-blue-400/15 to-purple-400/20 dark:from-cyan-600/20 dark:via-blue-600/15 dark:to-purple-600/20 rounded-full blur-3xl"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Neural network style connections */}
        <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-20" viewBox="0 0 1000 1000">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.circle
              key={i}
              cx={100 + i * 120}
              cy={200 + (i % 2) * 300}
              r="2"
              fill="currentColor"
              className="text-blue-500"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <motion.line
              key={i}
              x1={100 + i * 120}
              y1={200 + (i % 2) * 300}
              x2={220 + i * 120}
              y2={200 + ((i + 1) % 2) * 300}
              stroke="currentColor"
              strokeWidth="1"
              className="text-blue-400/50"
              animate={{
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          ))}
        </svg>

        {/* Floating AI particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}

        {/* Interactive gradient follower */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl"
            >
              <Brain className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              AI-Powered Recommendations
            </h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 bg-green-100 dark:bg-green-900 rounded-full"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </motion.div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our advanced machine learning algorithms analyze millions of data points to deliver 
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> personalized recommendations</span> 
            {' '}tailored specifically for you
          </p>

          {/* AI Stats Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center gap-8 mt-8 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto"
          >
            {[
              { label: "AI Accuracy", value: "99.2%", icon: Target },
              { label: "Data Points", value: "2.4M+", icon: BarChart3 },
              { label: "ML Models", value: "12", icon: Cpu },
              { label: "Real-time", value: "<50ms", icon: Zap }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Interactive Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center mb-16"
        >
          <div className="flex bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-2 border border-gray-200 dark:border-gray-700">
            {[
              { id: 'personalized', label: 'For You', icon: Target, count: recommendations.length },
              { id: 'trending', label: 'Trending', icon: TrendingUp, count: trending.length },
              { id: 'insights', label: 'AI Insights', icon: Activity, count: 4 }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}>
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="relative">
          {/* Personalized Recommendations */}
          {activeTab === 'personalized' && recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Curated Just for You
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Based on your preferences, location, and usage patterns
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendations.slice(0, 6).map((rec, index) => (
                  <motion.div
                    key={rec.service_name}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.8, type: "spring" }}
                    className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 cursor-pointer overflow-hidden"
                    onClick={() => handleServiceClick(rec.service_name)}
                    onMouseEnter={() => setHoveredCard(rec.service_name)}
                    onMouseLeave={() => setHoveredCard(null)}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Confidence Badge */}
                    <div className="flex justify-between items-start mb-6">
                      <motion.div
                        animate={{ 
                          scale: hoveredCard === rec.service_name ? 1.1 : 1,
                          rotate: hoveredCard === rec.service_name ? [0, 5, -5, 0] : 0
                        }}
                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                      >
                        <Sparkles className="h-4 w-4" />
                        {Math.round(rec.confidence_score * 100)}% Match
                      </motion.div>
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="p-2 bg-blue-100 dark:bg-blue-900 rounded-xl"
                      >
                        <Star className="h-5 w-5 text-blue-600" />
                      </motion.div>
                    </div>

                    {/* Service Name */}
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {rec.service_name}
                    </h4>

                    {/* Reason */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {rec.reason}
                    </p>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">Duration</div>
                          <div className="text-gray-600 dark:text-gray-300 text-xs">{aiUtils.formatDuration(rec.estimated_duration)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <span className="text-xl text-green-600">₹</span>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">Price</div>
                          <div className="text-gray-600 dark:text-gray-300 text-xs">{aiUtils.formatPrice(rec.estimated_price)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.div
                      className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        Book Now
                      </span>
                      <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Trending Services */}
          {activeTab === 'trending' && trending.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Trending in {location}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Most popular services based on real-time demand analysis
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {trending.slice(0, 4).map((trend, index) => (
                  <motion.div
                    key={trend.service_name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.8 }}
                    className="group bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl p-8 border border-orange-200 dark:border-orange-800 hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                    onClick={() => handleServiceClick(trend.service_name)}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Trending animation */}
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        <TrendingUp className="h-4 w-4" />
                        {trend.booking_increase}
                      </div>
                    </motion.div>

                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 transition-colors pr-20">
                      {trend.service_name}
                    </h4>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {trend.reason}
                    </p>

                    <div className="flex items-center gap-3 text-orange-600 dark:text-orange-400">
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">High demand in your area</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI Insights */}
          {activeTab === 'insights' && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  AI-Powered Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Real-time insights from our machine learning models
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockInsights.map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.8 }}
                    className={`group p-8 rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden ${
                      insight.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                      insight.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                      insight.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' :
                      'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                    }`}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <insight.icon className={`h-8 w-8 ${
                        insight.color === 'blue' ? 'text-blue-600' :
                        insight.color === 'green' ? 'text-green-600' :
                        insight.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                      }`} />
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                        insight.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300' :
                        insight.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300' :
                        insight.color === 'purple' ? 'bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300' :
                        'bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-300'
                      }`}>
                        {insight.trend}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {insight.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                      {insight.title}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Neural Network Visualization */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-16 p-12 bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl text-white relative overflow-hidden"
              >
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold mb-4">Machine Learning Pipeline</h4>
                  <p className="text-blue-200">Live data processing and model inference</p>
                </div>

                <div className="flex items-center justify-between">
                  {[
                    { label: "Data Collection", icon: Eye },
                    { label: "ML Processing", icon: Cpu },
                    { label: "AI Analysis", icon: Brain },
                    { label: "Recommendations", icon: Target }
                  ].map((step, index) => (
                    <motion.div
                      key={step.label}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index, duration: 0.6 }}
                    >
                      <motion.div
                        className="p-4 bg-white/10 rounded-2xl mb-4"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.5)", "0 0 0 20px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0)"]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          delay: index * 0.5 
                        }}
                      >
                        <step.icon className="h-8 w-8" />
                      </motion.div>
                      <span className="text-sm font-medium">{step.label}</span>
                      {index < 3 && (
                        <motion.div
                          className="absolute h-0.5 w-24 bg-blue-400 mt-6"
                          style={{ left: `${25 + index * 25}%` }}
                          animate={{ scaleX: [0, 1] }}
                          transition={{ delay: 0.5 + index * 0.3, duration: 0.8 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Enhanced AI Status Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-8 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-3 w-3 bg-green-500 rounded-full"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              AI Engine: <span className="text-green-600 font-bold">Active</span>
            </span>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              Processing 2.4M+ data points in real-time
            </span>
            <MousePointer className="h-4 w-4 text-blue-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 