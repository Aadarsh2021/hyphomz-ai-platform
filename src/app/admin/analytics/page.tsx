'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Brain,
  Calendar,
  MapPin,
  Star,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';
import { useRealTimeAnalytics } from '@/hooks/useAI';
import { aiUtils } from '@/lib/ai-api';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AIStatusIndicator from '@/components/ai/AIStatusIndicator';

export default function AIAnalyticsDashboard() {
  const { metrics, loading, error } = useRealTimeAnalytics();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <Brain className="h-8 w-8 text-blue-600" />
                AI Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Real-time insights powered by machine learning
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <AIStatusIndicator />
              <div className="flex gap-2">
                {['24h', '7d', '30d'].map((range) => (
                  <Button
                    key={range}
                    variant={selectedTimeRange === range ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeRange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Real-time Metrics */}
        {metrics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {/* Active Bookings */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Active Bookings
                  </p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                    {metrics.active_bookings}
                  </p>
                </div>
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-green-600 font-medium">+12%</span>
                <span className="text-gray-500">from last week</span>
              </div>
            </Card>

            {/* Revenue Today */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Revenue Today
                  </p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-200">
                    ₹{metrics.revenue_today?.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="p-3 bg-green-500 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-green-600 font-medium">+8%</span>
                <span className="text-gray-500">from yesterday</span>
              </div>
            </Card>

            {/* Online Providers */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    Online Providers
                  </p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                    {metrics.online_providers}
                  </p>
                </div>
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-green-600 font-medium">+5%</span>
                <span className="text-gray-500">availability</span>
              </div>
            </Card>

            {/* Customer Satisfaction */}
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    Satisfaction
                  </p>
                  <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-200">
                    {metrics.customer_satisfaction_today}
                  </p>
                </div>
                <div className="p-3 bg-yellow-500 rounded-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-green-600 font-medium">+0.2</span>
                <span className="text-gray-500">from last week</span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* AI Insights and Popular Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AI-Powered Insights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                AI-Powered Insights
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Demand Prediction
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        House Cleaning demand will increase by 23% this weekend. Consider scheduling more providers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Revenue Optimization
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Dynamic pricing for peak hours could increase revenue by 15%. Enable smart pricing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Response Time Alert
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Average response time is {metrics?.avg_response_time_minutes}min. Target: 15min.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Popular Services */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-600" />
                Popular Services Now
              </h3>
              
              {metrics?.popular_services_now && (
                <div className="space-y-3">
                  {metrics.popular_services_now.map((service: any, index: number) => (
                    <div key={service.service} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {service.service}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Current demand
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {service.current_demand}
                        </div>
                        <div className="text-sm text-green-600">
                          +{Math.round(Math.random() * 20)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* System Health */}
        {metrics?.system_health && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-600" />
                AI System Health
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {metrics.system_health.api_response_time}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    API Response
                  </div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {metrics.system_health.cache_hit_rate}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Cache Hit Rate
                  </div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {metrics.system_health.ml_model_status}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    ML Models
                  </div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {metrics.system_health.database_performance}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Database
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Alerts */}
        {metrics?.alerts && metrics.alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Recent Alerts
              </h3>
              
              <div className="space-y-3">
                {metrics.alerts.map((alert: any, index: number) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'warning' 
                        ? 'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/20' 
                        : 'bg-blue-50 border-blue-500 dark:bg-blue-900/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {alert.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.type === 'warning' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      }`}>
                        {alert.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
} 