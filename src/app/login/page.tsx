'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { fadeIn, slideInFromLeft, slideInFromRight, scaleUp } from '@/utils/animations';
import { 
  Brain, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Phone,
  Globe,
  Award,
  Heart,
  Rocket
} from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  general?: string;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentFeature, setCurrentFeature] = useState(0);
  const { scrollYProgress } = useScroll();

  // Parallax transforms
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

  // Auto-cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Mock validation functions
  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return undefined;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return undefined;
  };

  const validateName = (name: string, fieldName: string): string | undefined => {
    if (!name) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phone) return 'Phone number is required';
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Common validations
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);

    // Signup specific validations
    if (!isLogin) {
      newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword || '');
      newErrors.firstName = validateName(formData.firstName || '', 'First name');
      newErrors.lastName = validateName(formData.lastName || '', 'Last name');
      newErrors.phone = validatePhone(formData.phone || '');
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock validation - simulate server response
      if (formData.email === 'admin@hyphomz.com' && formData.password === 'Admin123!') {
        setSuccess(true);
        console.log('Login successful:', formData);
      } else if (isLogin) {
        setErrors({ general: 'Invalid email or password. Try admin@hyphomz.com / Admin123!' });
      } else {
        // For signup, always show success
        setSuccess(true);
        console.log('Signup successful:', formData);
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      console.log(`${provider} login successful`);
    } catch (error) {
      setErrors({ general: `${provider} login failed. Please try again.` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      console.log('Guest login successful');
    } catch (error) {
      setErrors({ general: 'Guest login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
    });
    setErrors({});
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center"
        >
          <Card variant="gradient" className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {isLogin ? 'Welcome Back!' : 'Account Created!'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {isLogin 
                ? 'You have successfully logged in to your Hyphomz account.' 
                : 'Your account has been created successfully. Welcome to Hyphomz!'
              }
            </p>
            <div className="space-y-3">
              <Link href="/services">
                <Button fullWidth>Explore Services</Button>
              </Link>
              <Button variant="outline" fullWidth onClick={() => setSuccess(false)}>
                Back to {isLogin ? 'Login' : 'Signup'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Interactive Background */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        {/* Dynamic gradient background */}
        <motion.div
          style={{ y: y1 }}
          animate={{
            background: [
              "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/80 to-blue-100/90 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950"
        />

        {/* Interactive gradient follower */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 50 + window.innerWidth / 2 - 192,
            y: mousePosition.y * 50 + window.innerHeight / 2 - 192,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200
          }}
        />

        {/* Floating AI particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-40"
            style={{
              left: `${10 + i * 4.5}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}

        {/* Neural network connections */}
        <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1000 1000">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.circle
              key={i}
              cx={150 + i * 140}
              cy={300 + (i % 2) * 200}
              r="3"
              fill="currentColor"
              className="text-indigo-500"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 py-12 relative z-10">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Enhanced Left Side - Premium Branding */}
        <motion.div
          variants={slideInFromLeft}
          initial="initial"
          animate="animate"
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Premium AI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="mb-8 flex justify-center"
            >
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold border border-white/20 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
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

            {/* Interactive Feature Showcase */}
            <div className="relative mb-12">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Enhanced background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-500/30 rounded-3xl blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main image with 3D effect */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/hero.png"
                    alt="Hyphomz Services"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-900/20" />
                </motion.div>
                
                {/* Floating achievement badges */}
                <motion.div
                  animate={{
                    y: [-8, 8],
                    x: [-2, 2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="absolute -top-6 -right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">Top Rated</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">4.9/5 ⭐</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [8, -8],
                    x: [2, -2]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">Fast Service</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">15-30 mins</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [-5, 5],
                    rotate: [-2, 2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 -left-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-1.5 rounded-lg">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white">10K+</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Customers</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Enhanced welcome section */}
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-black leading-tight">
                  <span className="block text-gray-900 dark:text-white">Welcome to</span>
                  <motion.span 
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{
                      backgroundSize: "200% 200%"
                    }}
                  >
                    Hyphomz
                  </motion.span>
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Professional home services powered by AI, delivered to your doorstep within 
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> 15-30 minutes</span>
              </motion.p>

              {/* Interactive feature grid */}
              <motion.div 
                className="grid grid-cols-2 gap-4 max-w-md mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                {[
                  { icon: Shield, text: "Verified Professionals", color: "from-green-500 to-emerald-500" },
                  { icon: Clock, text: "24/7 Support", color: "from-blue-500 to-cyan-500" },
                  { icon: Award, text: "Quality Guaranteed", color: "from-purple-500 to-indigo-500" },
                  { icon: Heart, text: "Customer First", color: "from-red-500 to-pink-500" }
                ].map((feature, idx) => (
                  <motion.div
                    key={feature.text}
                    className="flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + idx * 0.1 }}
                  >
                    <div className={`p-2 bg-gradient-to-r ${feature.color} rounded-lg`}>
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Right Side - Premium Auth Form */}
        <motion.div
          variants={slideInFromRight}
          initial="initial"
          animate="animate"
          className="max-w-md w-full mx-auto"
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Premium backdrop blur card */}
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50" />
            
            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-lg"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative p-8 space-y-8">
            {/* Logo for mobile */}
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center">
                <div className="relative w-8 h-8 mr-2">
                  <Image
                    src="/images/logo-light.png"
                    alt="Hyphomz Logo"
                    width={32}
                    height={32}
                    className="object-contain dark:hidden"
                  />
                  <Image
                    src="/images/logo-dark.png"
                    alt="Hyphomz Logo"
                    width={32}
                    height={32}
                    className="object-contain hidden dark:block"
                  />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">Hyphomz</span>
              </Link>
            </div>

            {/* Enhanced Auth Toggle */}
            <motion.div 
              className="relative bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-1.5 mb-8 border border-gray-200/50 dark:border-gray-600/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative flex">
                {/* Sliding background */}
                <motion.div
                  className="absolute top-1.5 bottom-1.5 bg-white dark:bg-gray-600 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-500/50"
                  initial={false}
                  animate={{
                    left: isLogin ? "6px" : "50%",
                    right: isLogin ? "50%" : "6px"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
                
                <motion.button
                  type="button"
                  onClick={() => isLogin || toggleAuthMode()}
                  className={`relative z-10 flex-1 py-3 px-6 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isLogin
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Sign In
                  </div>
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => !isLogin || toggleAuthMode()}
                  className={`relative z-10 flex-1 py-3 px-6 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    !isLogin
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" />
                    Sign Up
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Enhanced Form Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h2 
                className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-600 to-gray-900 dark:from-white dark:via-indigo-400 dark:to-white"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </motion.h2>
              
              <motion.p 
                className="mt-3 text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {isLogin 
                  ? 'Sign in to access your premium account' 
                  : 'Join thousands of satisfied customers'
                }
              </motion.p>
              
              {/* Premium badge for AI features */}
              <motion.div
                className="flex justify-center mt-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full border border-indigo-200/50 dark:border-indigo-700/50">
                  <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    AI-Enhanced Experience
                  </span>
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
              </motion.div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700 dark:text-red-400 text-sm">{errors.general}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login"
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    className="space-y-4"
                  >
                    {/* Email */}
                    <div>
                      <Input
                        type="email"
                        label="Email Address"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(value) => handleInputChange('email', value)}
                        error={errors.email}
                        required
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          label="Password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(value) => handleInputChange('password', value)}
                          error={errors.password}
                          required
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-9 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    className="space-y-4"
                  >
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        label="First Name"
                        placeholder="John"
                        value={formData.firstName || ''}
                        onChange={(value) => handleInputChange('firstName', value)}
                        error={errors.firstName}
                        required
                      />
                      <Input
                        type="text"
                        label="Last Name"
                        placeholder="Doe"
                        value={formData.lastName || ''}
                        onChange={(value) => handleInputChange('lastName', value)}
                        error={errors.lastName}
                        required
                      />
                    </div>

                    {/* Email */}
                    <Input
                      type="email"
                      label="Email Address"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(value) => handleInputChange('email', value)}
                      error={errors.email}
                      required
                    />

                    {/* Phone */}
                    <Input
                      type="tel"
                      label="Phone Number"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone || ''}
                      onChange={(value) => handleInputChange('phone', value)}
                      error={errors.phone}
                      required
                    />

                    {/* Password */}
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(value) => handleInputChange('password', value)}
                        error={errors.password}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        placeholder="••••••••"
                        value={formData.confirmPassword || ''}
                        onChange={(value) => handleInputChange('confirmPassword', value)}
                        error={errors.confirmPassword}
                        required
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-9 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        required
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        I agree to the{' '}
                        <button type="button" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button type="button" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                          Privacy Policy
                        </button>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                size="lg"
                disabled={isLoading}
                className="relative"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </span>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Social Login */}
            <motion.div 
              className="mt-6 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
                className="relative group w-full flex justify-center items-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50 dark:from-blue-900/20 dark:to-red-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="relative w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="relative">Google</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={isLoading}
                className="relative group w-full flex justify-center items-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="relative w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="relative">Facebook</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Guest Login */}
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                type="button"
                onClick={handleGuestLogin}
                disabled={isLoading}
                className="relative group w-full flex justify-center items-center py-3 px-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl shadow-lg text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Globe className="w-5 h-5 mr-2" />
                Continue as Guest
                <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </motion.button>
            </motion.div>

            {/* Enhanced Demo Credentials */}
            <AnimatePresence>
              {isLogin && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="mt-8 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl" />
                  <div className="relative p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">Demo Credentials</h4>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                      >
                        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50/80 dark:bg-blue-900/30 rounded-xl">
                        <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <div>
                          <div className="text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">Email</div>
                          <div className="text-sm font-mono font-semibold text-blue-800 dark:text-blue-200">admin@hyphomz.com</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-blue-50/80 dark:bg-blue-900/30 rounded-xl">
                        <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <div>
                          <div className="text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">Password</div>
                          <div className="text-sm font-mono font-semibold text-blue-800 dark:text-blue-200">Admin123!</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                      <Shield className="w-3 h-3" />
                      <span>Try the demo with these test credentials</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </div>
  );
} 