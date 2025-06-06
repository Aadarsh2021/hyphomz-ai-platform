'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn, slideInFromLeft, slideInFromRight } from '@/utils/animations';
import Button from './ui/Button';
import Card from './ui/Card';
import Input from './ui/Input';
import { useState } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare, 
  Sparkles,
  Users,
  Shield,
  Award,
  Star,
  Zap
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['+91 98765 43210', 'Mon-Fri from 9am to 7pm IST'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['hello@hyphomz.com', 'We reply within 24 hours'],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
  },
  {
    icon: MapPin,
    title: 'Office',
    details: ['Bangalore, Karnataka', 'India 560001'],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
  },
  {
    icon: Clock,
    title: 'Support Hours',
    details: ['24/7 AI Support', 'Human support: 9am-9pm IST'],
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'
  }
];

const stats = [
  { number: "50K+", label: "Messages Sent", icon: MessageSquare },
  { number: "99.5%", label: "Response Rate", icon: CheckCircle },
  { number: "< 2hr", label: "Avg Response Time", icon: Clock },
  { number: "4.9/5", label: "Customer Rating", icon: Star }
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-32 md:py-40 bg-gradient-to-b from-gray-50/70 via-white to-indigo-50/30 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-gray-800/90 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-bl from-indigo-200/15 to-purple-200/15 dark:from-indigo-900/15 dark:to-purple-900/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/3 -left-1/3 w-2/3 h-2/3 bg-gradient-to-tr from-blue-200/15 to-indigo-200/15 dark:from-blue-900/15 dark:to-indigo-900/15 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Enhanced Section header */}
        <motion.div variants={fadeIn} className="text-center max-w-4xl mx-auto mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg"
          >
            <MessageSquare className="h-4 w-4" />
            Contact Us
            <Sparkles className="h-4 w-4" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-black mb-8"
          >
            <span className="text-gray-900 dark:text-white">Let's Start a</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
              Conversation
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Have questions? We're here to help. Send us a message and we'll respond as soon as possible. 
            Our AI-powered support system ensures you get the best assistance 24/7.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </motion.div>
                <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Contact form */}
          <motion.div variants={slideInFromLeft}>
            <Card variant="gradient" className="p-8 md:p-10 border-2 border-white/20 dark:border-gray-700/20 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Send us a Message</h3>
                <p className="text-gray-600 dark:text-gray-300">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    animate={{ 
                      scale: focusedField === 'firstName' ? 1.02 : 1,
                      y: focusedField === 'firstName' ? -2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      label="First Name"
                      value={formData.firstName}
                      onChange={(value) => handleInputChange('firstName', value)}
                      required
                    />
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: focusedField === 'lastName' ? 1.02 : 1,
                      y: focusedField === 'lastName' ? -2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(value) => handleInputChange('lastName', value)}
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  animate={{ 
                    scale: focusedField === 'email' ? 1.02 : 1,
                    y: focusedField === 'email' ? -2 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    required
                  />
                </motion.div>

                <motion.div
                  animate={{ 
                    scale: focusedField === 'phone' ? 1.02 : 1,
                    y: focusedField === 'phone' ? -2 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    type="tel"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    required
                  />
                </motion.div>

                <motion.div
                  className="relative"
                  animate={{ 
                    scale: focusedField === 'message' ? 1.02 : 1,
                    y: focusedField === 'message' ? -2 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    required
                    className="w-full px-4 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Tell us how we can help you..."
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    fullWidth 
                    size="lg" 
                    className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <div className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </Button>
                </motion.div>

                {/* Enhanced Status messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <p className="text-green-700 dark:text-green-300 font-medium">
                      Message sent successfully! We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <p className="text-red-700 dark:text-red-300 font-medium">
                      Something went wrong. Please try again later.
                    </p>
                  </motion.div>
                )}
              </form>
            </Card>
          </motion.div>

          {/* Enhanced Contact information */}
          <motion.div variants={slideInFromRight} className="space-y-8">
            {/* Contact info cards */}
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card variant="gradient" className="p-6 border-2 border-white/20 dark:border-gray-700/20 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                    <div className={`absolute inset-0 bg-gradient-to-br ${info.bgColor} rounded-2xl opacity-50`} />
                    <div className="relative flex items-start space-x-4">
                      <motion.div 
                        className={`bg-gradient-to-br ${info.color} p-3 rounded-2xl shadow-lg flex-shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <info.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{info.title}</h4>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className={`text-gray-600 dark:text-gray-300 ${detailIndex === 0 ? 'font-semibold' : 'text-sm'}`}>
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Why choose us section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card variant="gradient" className="p-8 border-2 border-white/20 dark:border-gray-700/20 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                  <Award className="h-6 w-6 text-indigo-600" />
                  Why Choose Our Support?
                </h3>
                
                <div className="space-y-4">
                  {[
                    { icon: Zap, title: "Lightning Fast Response", desc: "AI-powered triage ensures priority issues get immediate attention" },
                    { icon: Users, title: "Expert Human Support", desc: "Certified professionals available for complex queries" },
                    { icon: Shield, title: "Secure & Private", desc: "Your data is protected with enterprise-grade security" },
                    { icon: Star, title: "99.5% Satisfaction", desc: "Thousands of customers trust our support experience" }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/30"
                      whileHover={{ scale: 1.02, x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg"
                        whileHover={{ rotate: 5 }}
                      >
                        <feature.icon className="h-4 w-4 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 