'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { Calendar, Clock, User, MapPin, Phone, CreditCard, Star, Zap, Shield, Award, Sparkles } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
}

interface ServiceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  specialties: string[];
  avatar: string;
  isAvailable: boolean;
}

interface BookingSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onConfirmBooking: (bookingDetails: BookingDetails) => void;
}

interface BookingDetails {
  service: Service;
  selectedDate: string;
  selectedTime: string;
  selectedProvider?: ServiceProvider;
  selectedAddons: ServiceAddon[];
  customerAddress: string;
  customerPhone: string;
  paymentMethod: string;
  contactPreference: string;
  totalPrice: number;
  customerNotes?: string;
  urgentService: boolean;
}

const BookingSummaryModal: React.FC<BookingSummaryModalProps> = ({
  isOpen,
  onClose,
  service,
  onConfirmBooking
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<ServiceAddon[]>([]);
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [contactPreference, setContactPreference] = useState('phone');
  const [customerNotes, setCustomerNotes] = useState('');
  const [urgentService, setUrgentService] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Mock data for service providers
  const serviceProviders: ServiceProvider[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      rating: 4.9,
      reviews: 127,
      specialties: ['Expert technician', 'Same-day service', '5+ years experience'],
      avatar: '👨‍🔧',
      isAvailable: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      rating: 4.8,
      reviews: 89,
      specialties: ['Certified professional', 'Quality guarantee', '3+ years experience'],
      avatar: '👩‍🔧',
      isAvailable: true
    },
    {
      id: '3',
      name: 'Amit Singh',
      rating: 4.7,
      reviews: 156,
      specialties: ['Licensed technician', 'Emergency service', '7+ years experience'],
      avatar: '👨‍🔧',
      isAvailable: false
    }
  ];

  // Mock data for service add-ons
  const serviceAddons: ServiceAddon[] = [
    {
      id: '1',
      name: 'Express Service',
      description: 'Priority scheduling within 2 hours',
      price: 750,
      duration: '0 hours'
    },
    {
      id: '2',
      name: 'Extended Warranty',
      description: '6-month warranty on all work performed',
      price: 450,
      duration: '0 hours'
    },
    {
      id: '3',
      name: 'Follow-up Inspection',
      description: 'Free inspection after 30 days',
      price: 0,
      duration: '30 mins'
    },
    {
      id: '4',
      name: 'Premium Materials',
      description: 'Use of premium quality materials and parts',
      price: 1200,
      duration: '0 hours'
    }
  ];

  // Generate available dates (next 14 days, excluding unavailable dates)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const unavailableDates = [3, 7, 11]; // Mock some unavailable dates
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const isUnavailable = unavailableDates.includes(i);
      
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-IN', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        isUnavailable,
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }
    return dates;
  };

  // Generate available time slots based on selected date
  const getAvailableTimeSlots = () => {
    const baseSlots = [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00'
    ];

    // Mock some booked slots
    const bookedSlots = ['09:30', '12:00', '15:30'];
    
    return baseSlots.map(time => ({
      time,
      isBooked: bookedSlots.includes(time),
      isPopular: ['10:00', '14:00', '16:00'].includes(time)
    }));
  };

  const handleAddonToggle = (addon: ServiceAddon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case 1:
        if (!selectedDate) newErrors.date = 'Please select a date';
        if (!selectedTime) newErrors.time = 'Please select a time';
        break;
      case 2:
        if (!selectedProvider) newErrors.provider = 'Please select a service provider';
        break;
      case 3:
        if (!customerAddress.trim()) newErrors.address = 'Address is required';
        if (!customerPhone.trim()) newErrors.phone = 'Phone number is required';
        if (!/^\+91\s?\d{5}\s?\d{5}$|^\d{10}$/.test(customerPhone.replace(/\s/g, ''))) newErrors.phone = 'Please enter a valid Indian phone number';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleConfirmBooking = async () => {
    if (!service || !validateStep(3)) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const bookingDetails: BookingDetails = {
        service,
        selectedDate,
        selectedTime,
        selectedProvider: selectedProvider || undefined,
        selectedAddons,
        customerAddress,
        customerPhone,
        paymentMethod,
        contactPreference,
        totalPrice: calculateTotalPrice(),
        customerNotes: customerNotes || undefined,
        urgentService
      };
      
      onConfirmBooking(bookingDetails);
      handleClose();
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedProvider(null);
    setSelectedAddons([]);
    setCustomerAddress('');
    setCustomerPhone('');
    setPaymentMethod('card');
    setContactPreference('phone');
    setCustomerNotes('');
    setUrgentService(false);
    setErrors({});
    onClose();
  };

  const calculateTotalPrice = () => {
    if (!service) return 0;
    const serviceFee = 150; // Service fee in INR
    const addonTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const urgentFee = urgentService ? 500 : 0; // Urgent fee in INR
    return service.price + serviceFee + addonTotal + urgentFee;
  };

  const getEstimatedArrival = () => {
    if (!selectedDate || !selectedTime) return '';
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const arrivalWindow = new Date(selectedDateTime.getTime() - 15 * 60000); // 15 mins before
    return `${arrivalWindow.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })} - ${selectedDateTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })}`;
  };

  const stepTitles = [
    'Select Date & Time',
    'Choose Provider',
    'Service Details',
    'Confirmation'
  ];

  if (!service) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title=""
      size="xl"
    >
      <div className="relative overflow-hidden">
        {/* Enhanced Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-200/10 to-blue-200/10 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 p-6">
        {/* Enhanced Modal Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 pb-6 border-b border-gray-200 dark:border-gray-700"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Smart Booking System
            <Zap className="h-4 w-4" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Book <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">{service.name}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Complete your booking in just a few simple steps
          </p>
        </motion.div>

        {/* Enhanced Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            {stepTitles.map((title, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center"
              >
                <div className="relative">
                  <motion.div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      index + 1 <= currentStep 
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index + 1 < currentStep ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    ) : index + 1 === currentStep ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center justify-center"
                      >
                        {index + 1}
                      </motion.div>
                    ) : (
                      index + 1
                    )}
                  </motion.div>
                  {index + 1 === currentStep && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-20"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
                {index + 1 === currentStep && (
                  <div className="w-16 h-1 mx-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: index + 1 < currentStep ? '100%' : '0%' }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {stepTitles[currentStep - 1]}
            </h3>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Step {currentStep} of {stepTitles.length}</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>{Math.round((currentStep / stepTitles.length) * 100)}% Complete</span>
            </div>
          </motion.div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* Step 1: Date & Time Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Enhanced Service Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card variant="gradient" className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <div 
                          className="w-8 h-8 text-white"
                          dangerouslySetInnerHTML={{ __html: service.icon }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">{service.name}</h4>
                          <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                            <Shield className="h-3 w-3" />
                            Quality Assured
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>4.9 Rating</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">₹{service.price}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Base Price</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>



                {/* Service Enhancement Options */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Service Enhancements
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-transparent dark:from-indigo-800"></div>
                  </div>

                  {/* Enhanced Urgent Service Toggle */}
                  <Card 
                    variant={urgentService ? "gradient" : "outline"}
                    className={`relative overflow-hidden transition-all duration-500 border-2 ${
                      urgentService 
                        ? 'border-amber-300 dark:border-amber-700 shadow-2xl shadow-amber-500/20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-amber-300/50 dark:hover:border-amber-600/50'
                    }`}
                  >
                    {/* Background Animated Elements */}
                    {urgentService && (
                      <>
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-amber-200/10 to-orange-200/10 rounded-full blur-3xl"
                        />
                        <motion.div
                          animate={{
                            rotate: [360, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-orange-200/10 to-yellow-200/10 rounded-full blur-2xl"
                        />
                      </>
                    )}

                    {/* Premium Badges */}
                    {urgentService && (
                      <>
                        <div className="absolute top-4 right-4 z-10">
                          <motion.div 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                          >
                            <Star className="h-3 w-3" />
                            Priority
                          </motion.div>
                        </div>
                        
                        <div className="absolute top-4 left-4 z-10">
                          <motion.div 
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                          >
                            <Zap className="h-3 w-3" />
                            Fast-Track
                          </motion.div>
                        </div>
                      </>
                    )}

                    {/* Main Content */}
                    <div className="relative z-20 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Enhanced Icon */}
                        <motion.div 
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-500 ${
                            urgentService 
                              ? 'bg-gradient-to-br from-amber-500 to-orange-500' 
                              : 'bg-gradient-to-br from-gray-400 to-gray-500'
                          }`}
                          whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.3 }}
                        >
                          {urgentService && (
                            <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
                          )}
                          <Zap className={`w-8 h-8 relative z-10 transition-colors duration-300 ${
                            urgentService ? 'text-white drop-shadow-lg' : 'text-white'
                          }`} />
                          
                          {/* Sparkle effects for active state */}
                          {urgentService && (
                            <>
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
                              <motion.div
                                animate={{
                                  y: [-3, -8, -3],
                                  x: [0, 3, 0],
                                  opacity: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: 0.5,
                                }}
                                className="absolute -top-1 -right-1"
                              >
                                <Sparkles className="h-3 w-3 text-yellow-300" />
                              </motion.div>
                            </>
                          )}
                        </motion.div>

                        {/* Content */}
                        <div>
                          <motion.h4 
                            className={`text-xl font-bold mb-1 transition-all duration-300 ${
                              urgentService 
                                ? 'bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 dark:from-amber-300 dark:via-orange-400 dark:to-red-400' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                            whileHover={{ scale: 1.02 }}
                          >
                            Urgent Service
                          </motion.h4>
                          <div className={`text-sm mb-2 transition-colors duration-300 ${
                            urgentService 
                              ? 'text-amber-600 dark:text-amber-300' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            Priority scheduling within 2 hours
                          </div>
                          
                          {/* Enhanced Features */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {urgentService ? (
                              <>
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="flex items-center gap-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium"
                                >
                                  <Shield className="h-3 w-3" />
                                  Guaranteed 2hr arrival
                                </motion.div>
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium"
                                >
                                  <Star className="h-3 w-3" />
                                  Expert technician
                                </motion.div>
                              </>
                            ) : (
                              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                                Standard scheduling
                              </div>
                            )}
                          </div>

                          {/* Price Display */}
                          <div className={`flex items-center gap-2 transition-all duration-300 ${
                            urgentService ? 'scale-105' : ''
                          }`}>
                            <span className={`text-lg font-bold transition-colors duration-300 ${
                              urgentService 
                                ? 'text-amber-600 dark:text-amber-400' 
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {urgentService ? '+₹500' : 'Free'}
                            </span>
                            {urgentService && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium"
                              >
                                Worth it!
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Toggle Switch */}
                      <div className="flex flex-col items-end gap-2">
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Toggle clicked - Current state:', urgentService);
                            setUrgentService(prev => {
                              const newState = !prev;
                              console.log('Setting urgentService to:', newState);
                              return newState;
                            });
                          }}
                          className={`relative inline-flex h-10 w-20 items-center rounded-full transition-all duration-500 focus:outline-none focus:ring-4 shadow-lg ${
                            urgentService 
                              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-amber-500/30 focus:ring-amber-500/30' 
                              : 'bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-500/20 focus:ring-gray-500/20'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          role="switch"
                          aria-checked={urgentService}
                          aria-label={`${urgentService ? 'Deactivate' : 'Activate'} urgent service`}
                        >
                          <motion.span 
                            className={`inline-block h-8 w-8 transform rounded-full shadow-lg transition-all duration-500 ${
                              urgentService 
                                ? 'bg-white shadow-amber-500/50' 
                                : 'bg-white shadow-gray-500/30'
                            }`}
                            animate={{ 
                              x: urgentService ? 44 : 4,
                              rotate: urgentService ? 360 : 0 
                            }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 30,
                              duration: 0.5 
                            }}
                          >
                            {urgentService && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
                              >
                                <Zap className="h-4 w-4 text-white" />
                              </motion.div>
                            )}
                          </motion.span>
                          
                          {/* Glowing effect for active state */}
                          {urgentService && (
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20"
                            />
                          )}
                        </motion.button>

                        {/* Status Text */}
                        <motion.div
                          animate={{ scale: urgentService ? 1.05 : 1 }}
                          className={`text-xs font-medium transition-colors duration-300 ${
                            urgentService 
                              ? 'text-amber-600 dark:text-amber-400' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {urgentService ? 'ACTIVE' : 'OFF'}
                        </motion.div>
                      </div>
                    </div>

                    {/* Bottom Enhancement Bar */}
                    {urgentService && (
                      <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
                      >
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        />
                      </motion.div>
                                         )}
                   </Card>
                </motion.div>

                {/* Enhanced Date Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <label className="text-lg font-semibold text-gray-900 dark:text-white">
                      Select Date <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {getAvailableDates().map(date => (
                      <button
                        key={date.value}
                        onClick={() => !date.isUnavailable && setSelectedDate(date.value)}
                        disabled={date.isUnavailable}
                        className={`
                          p-3 text-center rounded-lg border transition-all relative
                          ${date.isUnavailable
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border-gray-200 dark:border-gray-700'
                            : selectedDate === date.value
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-400'
                          }
                          ${date.isWeekend && !date.isUnavailable ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}
                        `}
                      >
                        <div className="text-xs font-medium">{date.label}</div>
                        {date.isWeekend && !date.isUnavailable && (
                          <div className="text-xs text-blue-600 dark:text-blue-400">Weekend</div>
                        )}
                        {date.isUnavailable && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.date}</p>
                  )}
                </motion.div>

                {/* Enhanced Time Selection */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <label className="text-lg font-semibold text-gray-900 dark:text-white">
                        Select Time <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {getAvailableTimeSlots().map(({time, isBooked, isPopular}) => (
                        <button
                          key={time}
                          onClick={() => !isBooked && setSelectedTime(time)}
                          disabled={isBooked}
                          className={`
                            p-3 text-center rounded-lg border transition-all relative
                            ${isBooked
                              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border-gray-200 dark:border-gray-700'
                              : selectedTime === time
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-400'
                            }
                          `}
                        >
                          <div className="text-sm font-medium">{time}</div>
                          {isPopular && !isBooked && (
                            <div className="text-xs text-green-600 dark:text-green-400">Popular</div>
                          )}
                          {isBooked && (
                            <div className="text-xs text-gray-400">Booked</div>
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.time && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.time}</p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Provider Selection */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Choose your preferred service provider for this booking
                </div>
                
                {serviceProviders.map(provider => (
                  <Card 
                    key={provider.id}
                    variant={selectedProvider?.id === provider.id ? "gradient" : "outline"}
                    className={`p-4 cursor-pointer transition-all ${
                      !provider.isAvailable ? 'opacity-50' : 'hover:shadow-lg'
                    }`}
                    onClick={() => provider.isAvailable && setSelectedProvider(provider)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{provider.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{provider.name}</h4>
                          {!provider.isAvailable && (
                            <span className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full">
                              Unavailable
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < Math.floor(provider.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {provider.rating} ({provider.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {provider.specialties.map(specialty => (
                            <span key={specialty} className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      {selectedProvider?.id === provider.id && (
                        <div className="text-indigo-600 dark:text-indigo-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                
                {errors.provider && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.provider}</p>
                )}
              </motion.div>
            )}

            {/* Step 3: Service Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <Input
                     label="Service Address"
                     placeholder="A-123, Sector 15, Gurgaon, Haryana 122001"
                     value={customerAddress}
                     onChange={setCustomerAddress}
                     error={errors.address}
                     required
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                  />
                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={setCustomerPhone}
                    error={errors.phone}
                    required
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                  />
                </div>

                {/* Contact Preferences */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'phone', label: 'Phone Call', icon: '📞' },
                      { value: 'sms', label: 'Text Message', icon: '💬' },
                      { value: 'email', label: 'Email', icon: '📧' }
                    ].map(method => (
                      <button
                        key={method.value}
                        onClick={() => setContactPreference(method.value)}
                        className={`p-3 text-center rounded-lg border transition-all ${
                          contactPreference === method.value
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-indigo-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{method.icon}</div>
                        <div className="text-sm font-medium">{method.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'card', label: 'Credit/Debit Card', icon: '💳' },
                      { value: 'cash', label: 'Cash Payment', icon: '💵' }
                    ].map(method => (
                      <button
                        key={method.value}
                        onClick={() => setPaymentMethod(method.value)}
                        className={`p-4 text-center rounded-lg border transition-all ${
                          paymentMethod === method.value
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-indigo-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{method.icon}</div>
                        <div className="font-medium">{method.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Add-ons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Optional Add-ons
                  </label>
                  <div className="space-y-3">
                    {serviceAddons.map(addon => (
                      <Card 
                        key={addon.id}
                        variant="outline"
                        className={`p-4 cursor-pointer transition-all ${
                          selectedAddons.find(a => a.id === addon.id) ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
                        }`}
                        onClick={() => handleAddonToggle(addon)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selectedAddons.find(a => a.id === addon.id)
                                ? 'bg-indigo-600 border-indigo-600'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}>
                              {selectedAddons.find(a => a.id === addon.id) && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{addon.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{addon.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900 dark:text-white">
                              {addon.price === 0 ? 'Free' : `+₹${addon.price}`}
                            </div>
                            {addon.duration !== '0 hours' && (
                              <div className="text-sm text-gray-500">{addon.duration}</div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Any specific requirements, access instructions, or special requests..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Booking Summary */}
                <Card variant="gradient" className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Booking Summary</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Service</span>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Date & Time</span>
                      <span className="font-medium">
                        {new Date(selectedDate).toLocaleDateString('en-IN', { 
                          weekday: 'short',
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })} at {selectedTime}
                      </span>
                    </div>

                    {getEstimatedArrival() && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Estimated Arrival</span>
                        <span className="font-medium">{getEstimatedArrival()}</span>
                      </div>
                    )}
                    
                    {selectedProvider && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Service Provider</span>
                        <span className="font-medium">{selectedProvider.name}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Address</span>
                      <span className="font-medium text-right max-w-xs">{customerAddress}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Contact</span>
                      <span className="font-medium">{customerPhone}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Payment</span>
                      <span className="font-medium capitalize">{paymentMethod}</span>
                    </div>
                  </div>
                </Card>

                {/* Price Breakdown */}
                <Card variant="outline" className="p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Price Breakdown</h4>
                                     <div className="space-y-3">
                     <div className="flex justify-between">
                       <span className="text-gray-600 dark:text-gray-400">{service.name}</span>
                       <span>₹{service.price.toFixed(0)}</span>
                     </div>
                     
                     {selectedAddons.map(addon => (
                       <div key={addon.id} className="flex justify-between">
                         <span className="text-gray-600 dark:text-gray-400">{addon.name}</span>
                         <span>₹{addon.price.toFixed(0)}</span>
                       </div>
                     ))}
                     
                     {urgentService && (
                       <div className="flex justify-between">
                         <span className="text-gray-600 dark:text-gray-400">Urgent Service Fee</span>
                         <span>₹500</span>
                       </div>
                     )}
                     
                     <div className="flex justify-between">
                       <span className="text-gray-600 dark:text-gray-400">Service Fee</span>
                       <span>₹150</span>
                     </div>
                     
                     <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                       <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                         <span>Total</span>
                         <span>₹{calculateTotalPrice().toFixed(0)}</span>
                       </div>
                     </div>
                  </div>
                </Card>

                {/* Important Information */}
                <Card variant="outline" className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-medium mb-1">Important Information:</p>
                      <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                        <li>• Our service provider will contact you 30 minutes before arrival</li>
                        <li>• Please ensure someone is available at the scheduled time</li>
                        <li>• Payment is due upon completion of service</li>
                        <li>• You can reschedule up to 2 hours before the appointment</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Navigation Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-indigo-900/50 -mx-6 px-6 pb-6 mt-6"
        >
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            {currentStep > 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={isLoading}
                  className="border-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-600 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </Button>
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {currentStep === 4 && (
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                  ₹{calculateTotalPrice().toFixed(0)}
                </div>
              </div>
            )}
            
            {currentStep < 4 ? (
              <Button
                onClick={handleNextStep}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Next Step
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleConfirmBooking}
                  disabled={isLoading}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 px-8"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <motion.svg 
                        className="w-5 h-5 mr-3 text-white" 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </motion.svg>
                      Confirming Booking...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Confirm Booking
                    </span>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingSummaryModal; 