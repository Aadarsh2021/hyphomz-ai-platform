'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  Brain, 
  Star, 
  MapPin, 
  Calendar,
  User,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Loader2,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useServiceDurationPrediction, useProviderMatching, useDynamicPricing } from '@/hooks/useAI';
import { aiUtils } from '@/lib/ai-api';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
}

interface AIEnhancedBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onConfirmBooking: (bookingDetails: any) => void;
  userLocation?: string;
  userId?: string;
}

export default function AIEnhancedBookingModal({
  isOpen,
  onClose,
  service,
  onConfirmBooking,
  userLocation = 'Greater Noida',
  userId = 'user_demo'
}: AIEnhancedBookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [complexity, setComplexity] = useState<'low' | 'medium' | 'high'>('medium');
  const [areaSqft, setAreaSqft] = useState<number>(1200);
  const [urgency, setUrgency] = useState<'urgent' | 'normal' | 'flexible'>('normal');

  // AI Hooks
  const durationPrediction = useServiceDurationPrediction();
  const providerMatching = useProviderMatching();
  const { pricing } = useDynamicPricing(service?.name || '', userLocation);

  // Get AI predictions when service changes
  useEffect(() => {
    if (service && isOpen) {
      // Get duration prediction
      durationPrediction.predictDuration({
        service_type: service.name,
        area_sqft: areaSqft,
        complexity: complexity,
        time_of_day: getTimeOfDay(selectedTime)
      });

      // Find best providers
      providerMatching.findProviders({
        service_type: service.name,
        location: userLocation,
        urgency: urgency
      });
    }
  }, [service, isOpen, areaSqft, complexity, urgency, selectedTime]);

  const getTimeOfDay = (time: string): 'morning' | 'afternoon' | 'evening' => {
    const hour = parseInt(time.split(':')[0] || '12');
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleConfirmBooking = () => {
    const bookingDetails = {
      service,
      selectedDate,
      selectedTime,
      selectedProvider: providerMatching.bestMatch,
      customerAddress,
      customerPhone,
      complexity,
      areaSqft,
      urgency,
      estimatedDuration: durationPrediction.prediction?.estimated_duration_minutes,
      aiPowered: true
    };
    onConfirmBooking(bookingDetails);
  };

  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        {/* Header with AI Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Book {service.name}
            </h2>
            <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              AI Enhanced
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Step {currentStep} of 4
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Service Details & AI Predictions */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Service Configuration */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Service Configuration
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Area Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Area (sq ft)
                      </label>
                      <Input
                        type="number"
                        value={areaSqft}
                        onChange={(e) => setAreaSqft(parseInt(e.target.value) || 1200)}
                        placeholder="Enter area in square feet"
                        className="w-full"
                      />
                    </div>

                    {/* Complexity Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Service Complexity
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['low', 'medium', 'high'] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setComplexity(level)}
                            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                              complexity === level
                                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Urgency Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Urgency Level
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['flexible', 'normal', 'urgent'] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setUrgency(level)}
                            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                              urgency === level
                                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* AI Predictions */}
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    AI Predictions
                  </h3>

                  <div className="space-y-4">
                    {/* Duration Prediction */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Estimated Duration
                        </span>
                      </div>
                      
                      {durationPrediction.loading ? (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Calculating...</span>
                        </div>
                      ) : durationPrediction.prediction ? (
                        <div>
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {durationPrediction.formattedDuration}
                          </div>
                          <div className="text-sm text-gray-500">
                            {durationPrediction.confidenceIndicator}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Range: {aiUtils.formatDuration(durationPrediction.prediction.duration_range.min)} - {aiUtils.formatDuration(durationPrediction.prediction.duration_range.max)}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          No prediction available
                        </div>
                      )}
                    </div>

                    {/* Dynamic Pricing */}
                    {pricing && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-100 dark:border-green-800">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            Smart Pricing
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {pricing.estimated_savings && (
                            <div className="text-green-600 font-medium">
                              💡 {pricing.estimated_savings}
                            </div>
                          )}
                          <div>Demand: {pricing.current_demand}</div>
                          <div>{pricing.best_booking_time}</div>
                        </div>
                      </div>
                    )}

                    {/* AI Insights */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Smart Insights
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <div>• {complexity} complexity affects duration</div>
                        <div>• {areaSqft} sq ft considered in calculation</div>
                        <div>• {urgency} priority service selected</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNextStep} className="px-8">
                  Next: Choose Provider
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: AI Provider Matching */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Zap className="h-5 w-5 text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI-Matched Service Providers
                </h3>
              </div>

              {providerMatching.loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Finding the best providers for you...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {providerMatching.providers.map((provider, index) => (
                    <motion.div
                      key={provider.provider_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        index === 0 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Best Match
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                          👨‍🔧
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {provider.name}
                          </h4>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">
                              {provider.rating} • {provider.experience_years}y exp
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <MapPin className="h-3 w-3" />
                            <span>{provider.distance_km}km away</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Clock className="h-3 w-3" />
                            <span>ETA: {provider.estimated_arrival}</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {aiUtils.formatPrice(provider.price_estimate)}
                          </div>
                          <div className="mt-2">
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              provider.match_score > 0.9 
                                ? 'bg-green-100 text-green-800' 
                                : provider.match_score > 0.8 
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              <Sparkles className="h-3 w-3" />
                              {Math.round(provider.match_score * 100)}% match
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
                <Button onClick={handleNextStep} className="px-8">
                  Next: Schedule
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Date & Time */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Schedule Your Service
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Date
                  </label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Time
                  </label>
                  <Input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
                <Button onClick={handleNextStep} className="px-8">
                  Next: Details
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Contact Details & Confirmation */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contact Details & Confirmation
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  <Input
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Enter your full address"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full"
                  />
                </div>
              </div>

              {/* AI-Enhanced Summary */}
              <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  AI-Optimized Booking Summary
                </h4>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  {durationPrediction.prediction && (
                    <div className="flex justify-between">
                      <span>Estimated Duration:</span>
                      <span className="font-medium text-blue-600">
                        {durationPrediction.formattedDuration}
                      </span>
                    </div>
                  )}
                  {providerMatching.bestMatch && (
                    <div className="flex justify-between">
                      <span>Provider:</span>
                      <span className="font-medium">{providerMatching.bestMatch.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span className="font-medium">{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-medium">Total Estimated Cost:</span>
                    <span className="font-bold text-lg">
                      {providerMatching.bestMatch 
                        ? aiUtils.formatPrice(providerMatching.bestMatch.price_estimate)
                        : aiUtils.formatPrice(service.price)
                      }
                    </span>
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
                <Button 
                  onClick={handleConfirmBooking} 
                  className="px-8 bg-gradient-to-r from-green-500 to-blue-600"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Confirm AI-Enhanced Booking
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
} 