'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer, fadeIn, scaleUp, slideInFromLeft, slideInFromRight } from '@/utils/animations';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { 
  Brain, 
  Sparkles, 
  Rocket, 
  Users, 
  Heart, 
  Target, 
  Zap, 
  Award, 
  Shield, 
  Globe, 
  Clock, 
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Play,
  Pause
} from 'lucide-react';

const stats = [
  { 
    number: '10,000+', 
    label: 'Happy Customers', 
    icon: Users, 
    color: 'from-blue-500 to-cyan-500',
    description: 'Satisfied customers across India'
  },
  { 
    number: '50+', 
    label: 'Professional Services', 
    icon: Zap, 
    color: 'from-purple-500 to-indigo-500',
    description: 'Expert services available'
  },
  { 
    number: '8', 
    label: 'Service Categories', 
    icon: Target, 
    color: 'from-green-500 to-emerald-500',
    description: 'Comprehensive home solutions'
  },
  { 
    number: '4.9/5', 
    label: 'Customer Rating', 
    icon: Star, 
    color: 'from-orange-500 to-yellow-500',
    description: 'Average customer satisfaction'
  },
];

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for perfection in every service we deliver, ensuring the highest quality standards.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'Trust',
    description: 'Building lasting relationships through reliability, transparency, and consistent performance.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Embracing technology and modern solutions to revolutionize home service delivery.',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction and comfort are at the heart of everything we do.',
    color: 'from-red-500 to-pink-500'
  },
];

const team = [
  {
    name: 'Kartik Gupta',
    role: 'Founder & CEO',
    image: '/images/hero.png', // Using available image as placeholder
    bio: 'Visionary leader with a passion for transforming home services through technology and innovation.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Operations',
    image: '/images/hero.png',
    bio: 'Expert in streamlining operations and ensuring seamless service delivery across all platforms.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Mike Chen',
    role: 'CTO',
    image: '/images/hero.png',
    bio: 'Technology enthusiast driving digital transformation and platform development.',
    linkedin: '#',
    twitter: '#'
  },
];

const milestones = [
  { year: '2025', title: 'Company Founded', description: 'Hyphomz was established with a vision to revolutionize home services.' },
  { year: '2025', title: 'Platform Launch', description: 'Launched our comprehensive home services platform.' },
  { year: '2025', title: '1000+ Customers', description: 'Reached our first milestone of serving 1000+ happy customers.' },
  { year: '2025', title: 'Service Expansion', description: 'Expanded to 8 different service categories across multiple cities.' },
];

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeValue, setActiveValue] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

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

  // Auto-cycle through values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
              {/* Enhanced Interactive Background */}
        <div className="fixed inset-0 -z-50 pointer-events-none">
          {/* Dynamic gradient background */}
          <motion.div
            style={{ y: y1 }}
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute inset-0"
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

          {/* Floating particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60"
              style={{
                left: `${20 + i * 6}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        <motion.section
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50/95 via-indigo-50/90 to-blue-100/95 dark:from-gray-900/98 dark:via-gray-800/95 dark:to-indigo-900/98 pt-32 md:pt-40 pb-20 md:pb-28"
      >

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced Left content */}
            <motion.div variants={slideInFromLeft} className="space-y-8">
              {/* Premium AI Badge */}
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

              {/* Enhanced heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                  <span className="block text-gray-900 dark:text-white">About</span>
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
              
              {/* Enhanced description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                  Revolutionizing home services with <span className="text-indigo-600 dark:text-indigo-400 font-semibold">speed, reliability, and innovation</span>. 
                  We're more than just a service provider – we're your trusted partner in making life easier.
                </p>

                <div className="flex flex-wrap gap-4">
                  {[
                    { text: "AI-Powered Matching", icon: Brain },
                    { text: "15-Min Response", icon: Clock },
                    { text: "Verified Experts", icon: Shield }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.text}
                      className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full font-semibold"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.text}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-3 gap-8 pt-6"
              >
                {[
                  { value: "2025", label: "Founded", icon: Rocket },
                  { value: "10K+", label: "Customers", icon: Users },
                  { value: "50+", label: "Services", icon: Award }
                ].map((stat, idx) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + idx * 0.1 }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                      <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Right content - Interactive Image */}
            <motion.div
              variants={slideInFromRight}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 dark:from-indigo-500/30 dark:to-blue-500/30 rounded-3xl blur-xl"
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
                
                {/* Main image container */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/hero.png"
                    alt="About Hyphomz"
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
                  className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                      <Award className="w-5 h-5 text-white" />
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
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">Innovation Leader</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">AI-Powered</div>
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
                  className="absolute top-1/2 -left-8 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700"
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
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Stats Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm relative"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={scaleUp}
                  className="text-center group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative mb-6">
                    <motion.div
                      className={`w-20 h-20 mx-auto bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <IconComponent className="h-10 w-10 text-white" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <motion.div
                    className="text-4xl font-black text-gray-900 dark:text-white mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.description}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Our
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"> Purpose</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={slideInFromLeft}>
              <Card variant="gradient" className="h-full p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  To simplify and elevate everyday living by providing fast, reliable, and professional home services at the customer's doorstep. We bridge the gap between quality service providers and homeowners who need trusted solutions.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={slideInFromRight}>
              <Card variant="gradient" className="h-full p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  To become the most trusted and accessible home services brand in India, known for innovation, service excellence, and commitment to improving quality of life for millions of families.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Our
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"> Values</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={scaleUp}
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card variant="gradient" className="h-full p-8 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Meet Our
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"> Team</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The passionate people behind Hyphomz
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={scaleUp}
              >
                <Card variant="gradient" className="text-center p-8 group hover:shadow-xl transition-all duration-300">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.linkedin} className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href={member.twitter} className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-white dark:bg-gray-800"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Our
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"> Journey</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Key milestones in our growth story
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="flex items-center space-x-8"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                  <Card variant="gradient" className="flex-1 p-6">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact CTA Section */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={fadeIn} className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Experience the Difference?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who trust Hyphomz for their home service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                  Explore Services
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-indigo-600">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Information */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div variants={scaleUp} className="text-center">
              <Card variant="gradient" className="p-6">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="font-bold mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">+91 6395238889</p>
              </Card>
            </motion.div>
            <motion.div variants={scaleUp} className="text-center">
              <Card variant="gradient" className="p-6">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="font-bold mb-2">Email</h3>
                <a
                  href="mailto:hyphomz.info@gmail.com"
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  hyphomz.info@gmail.com
                </a>
              </Card>
            </motion.div>
            <motion.div variants={scaleUp} className="text-center">
              <Card variant="gradient" className="p-6">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="font-bold mb-2">Website</h3>
                <a
                  href="https://hyphomz.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  hyphomz.shop
                </a>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
} 