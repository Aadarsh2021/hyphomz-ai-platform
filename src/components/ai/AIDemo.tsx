'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Play, 
  Clock, 
  Star, 
  Brain,
  Zap,
  Target,
  TrendingUp,
  User,
  MapPin
} from 'lucide-react';
import { 
  useServiceDurationPrediction, 
  useProviderMatching, 
  useTrendingServices,
  usePersonalizedRecommendations
} from '@/hooks/useAI';
import { aiUtils } from '@/lib/ai-api';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AIStatusIndicator from './AIStatusIndicator';

export default function AIDemo() {
  const [demoActive, setDemoActive] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);

  const durationPrediction = useServiceDurationPrediction();
  const providerMatching = useProviderMatching();
  const { trending, loading: trendingLoading } = useTrendingServices();
  const { recommendations, loading: recLoading } = usePersonalizedRecommendations('demo_user', 'Greater Noida');

  const runDurationDemo = async () => {
    setCurrentDemo('duration');
    await durationPrediction.predictDuration({
      service_type: 'House Cleaning',
      area_sqft: 1500,
      complexity: 'medium',
      provider_experience: 5,
      time_of_day: 'morning'
    });
    setTimeout(() => setCurrentDemo(null), 3000);
  };

  const runProviderDemo = async () => {
    setCurrentDemo('provider');
    await providerMatching.findProviders({
      service_type: 'Plumbing Repair',
      location: 'Greater Noida',
      urgency: 'normal'
    });
    setTimeout(() => setCurrentDemo(null), 3000);
  };

  const demoFeatures = [
    {
      id: 'duration',
      title: 'Duration Prediction',
      description: 'AI predicts service duration based on complexity, area, and provider experience',
      icon: Clock,
      color: 'blue',
      action: runDurationDemo,
      isActive: currentDemo === 'duration',
      result: durationPrediction.prediction
    },
    {
      id: 'provider',
      title: 'Smart Provider Matching',
      description: 'ML algorithm finds the best providers based on multiple factors',
      icon: User,
      color: 'green',
      action: runProviderDemo,
      isActive: currentDemo === 'provider',
      result: providerMatching.providers[0]
    },
    {
      id: 'recommendations',
      title: 'Personalized Recommendations',
      description: 'AI suggests services based on user preferences and behavior',
      icon: Target,
      color: 'purple',
      action: () => setCurrentDemo('recommendations'),
      isActive: currentDemo === 'recommendations',
      result: recommendations[0]
    },
    {
      id: 'trending',
      title: 'Trending Services',
      description: 'Real-time analysis of popular services in your area',
      icon: TrendingUp,
      color: 'orange',
      action: () => setCurrentDemo('trending'),
      isActive: currentDemo === 'trending',
      result: trending[0]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-10 w-10 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Features Demo
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Experience the power of artificial intelligence in home services. 
            Click on any feature below to see AI in action.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <AIStatusIndicator />
            <Button
              onClick={() => setDemoActive(!demoActive)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Play className="h-4 w-4 mr-2" />
              {demoActive ? 'Stop Demo' : 'Start Demo Mode'}
            </Button>
          </div>
        </motion.div>

        {/* Demo Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {demoFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isLoading = feature.isActive && (
              (feature.id === 'duration' && durationPrediction.loading) ||
              (feature.id === 'provider' && providerMatching.loading) ||
              (feature.id === 'recommendations' && recLoading) ||
              (feature.id === 'trending' && trendingLoading)
            );

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    feature.isActive ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={feature.action}
                >
                  <div className="text-center">
                    <div className={`inline-flex p-3 rounded-full mb-4 ${
                      feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      feature.color === 'green' ? 'bg-green-100 text-green-600' :
                      feature.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {feature.description}
                    </p>

                    {isLoading && (
                      <div className="flex items-center justify-center gap-2 text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                        <span className="text-xs">AI Processing...</span>
                      </div>
                    )}

                    {feature.result && !isLoading && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border"
                      >
                        {feature.id === 'duration' && feature.result.estimated_duration_minutes && (
                          <div>
                            <div className="text-lg font-bold text-blue-600">
                              {aiUtils.formatDuration(feature.result.estimated_duration_minutes)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {aiUtils.getConfidenceIndicator(feature.result.confidence_score)}
                            </div>
                          </div>
                        )}

                        {feature.id === 'provider' && feature.result.name && (
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {feature.result.name}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-yellow-600">
                              <Star className="h-3 w-3 fill-current" />
                              {feature.result.rating} • {feature.result.distance_km}km
                            </div>
                          </div>
                        )}

                        {feature.id === 'recommendations' && feature.result?.service_name && (
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {feature.result.service_name}
                            </div>
                            <div className="text-xs text-green-600">
                              {Math.round(feature.result.confidence_score * 100)}% match
                            </div>
                          </div>
                        )}

                        {feature.id === 'trending' && feature.result?.service_name && (
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {feature.result.service_name}
                            </div>
                            <div className="text-xs text-orange-600">
                              {feature.result.booking_increase} increase
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Live Demo Results */}
        {currentDemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Demo in Progress
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Watch as our AI processes real-time data to provide intelligent insights
              </p>

              <div className="flex items-center justify-center gap-2 text-blue-600">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="ml-3 font-medium">Processing with ML algorithms...</span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 px-6 py-3 rounded-full border border-green-200 dark:border-green-800">
            <Zap className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              AI-powered features are now live and ready to enhance your experience!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 