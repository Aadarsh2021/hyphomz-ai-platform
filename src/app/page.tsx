'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Contact from '../components/Contact';
import HowItWorks from '../components/HowItWorks';
import SmartRecommendations from '../components/ai/SmartRecommendations';
import SectionDivider from '../components/ui/SectionDivider';
import ScrollToTop from '../components/ui/ScrollToTop';
import { Sparkles, ArrowUp, Zap, MessageCircle, Info } from 'lucide-react';

// Enhanced scroll utilities
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const yOffset = -100; // Offset for fixed header
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
      ease: "easeOut"
    }
  }
};

const sectionVariants = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      damping: 15
    }
  }
};

const floatingElementVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 1,
      ease: "backOut"
    }
  }
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9]);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.main 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen relative"
    >
      {/* Enhanced Interactive Background */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        {/* Dynamic gradient background */}
        <motion.div
          style={{ y: y1 }}
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 40%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        />

        {/* Interactive mouse-following gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: `radial-gradient(600px at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, rgba(99, 102, 241, 0.15), transparent 80%)`
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          style={{ y: y2, rotate }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-xl blur-lg"
          animate={{
            rotate: [0, 180, 360],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          style={{ scale }}
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-lg"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Animated mesh background */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <motion.svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </motion.svg>
        </div>
      </div>

      {/* Floating particles */}
      {isLoaded && (
        <div className="fixed inset-0 -z-40 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced Floating Action Elements */}
      <motion.div
        variants={floatingElementVariants}
        className="fixed top-1/2 right-8 z-40 hidden xl:flex flex-col gap-4"
      >
        {/* AI Recommendations Button */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full shadow-lg cursor-pointer backdrop-blur-sm border border-white/20 group relative"
          onClick={() => scrollToSection('ai-recommendations-section')}
          title="Jump to AI Recommendations"
        >
          <Sparkles className="h-5 w-5 text-white group-hover:animate-pulse" />
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            AI Recommendations
          </div>
        </motion.div>
        
        {/* Services Quick Access */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-full shadow-lg cursor-pointer backdrop-blur-sm border border-white/20 group relative"
          onClick={() => scrollToSection('services-section')}
          title="Jump to Services"
        >
          <Zap className="h-5 w-5 text-white group-hover:animate-bounce" />
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            View Services
          </div>
        </motion.div>

        {/* How It Works Button */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-3 rounded-full shadow-lg cursor-pointer backdrop-blur-sm border border-white/20 group relative"
          onClick={() => scrollToSection('how-it-works-section')}
          title="How It Works"
        >
          <Info className="h-5 w-5 text-white group-hover:animate-pulse" />
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            How It Works
          </div>
        </motion.div>

        {/* Contact Button */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-full shadow-lg cursor-pointer backdrop-blur-sm border border-white/20 group relative"
          onClick={() => scrollToSection('contact-section')}
          title="Contact Us"
        >
          <MessageCircle className="h-5 w-5 text-white group-hover:animate-bounce" />
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Contact Us
          </div>
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Enhanced Section Transitions */}
      <motion.div 
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="animate"
        className="relative z-10"
      >
        <Hero />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionDivider variant="gradient" />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        viewport={{ once: true, margin: "-150px" }}
        whileInView="animate"
        className="relative"
        id="ai-recommendations-section"
      >
        <div className="relative">
          {/* Section background enhancement */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-gray-800/30 blur-3xl transform -skew-y-1" />
          <SmartRecommendations />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, rotateX: -15 }}
        whileInView={{ opacity: 1, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <SectionDivider variant="dots" />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="animate"
        className="relative"
        id="services-section"
      >
        <div className="relative">
          {/* Enhanced services section background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent dark:via-purple-900/10 blur-2xl" />
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <Services />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionDivider variant="gradient" />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="animate"
        className="relative"
        id="how-it-works-section"
      >
        <div className="relative">
          {/* How it works background enhancement */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 via-transparent to-purple-50/30 dark:from-indigo-900/10 dark:via-transparent dark:to-purple-900/10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: "200% 200%" }}
          />
          <HowItWorks />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <SectionDivider variant="dots" />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="animate"
        className="relative"
        id="contact-section"
      >
        <div className="relative">
          {/* Contact section background */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white/30 to-gray-50/50 dark:from-gray-800/50 dark:via-gray-900/30 dark:to-gray-800/50 backdrop-blur-sm" />
          <motion.div
            className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <Contact />
        </div>
      </motion.div>
      
      {/* Enhanced ScrollToTop with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: "backOut" }}
      >
        <ScrollToTop />
      </motion.div>

      {/* Decorative elements */}
      <div className="fixed bottom-8 left-8 -z-10 opacity-20 dark:opacity-10 pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-32 h-32 border-2 border-dashed border-blue-400 rounded-full"
        />
      </div>

      <div className="fixed top-20 right-20 -z-10 opacity-20 dark:opacity-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-24 h-24 border-2 border-dotted border-purple-400 rounded-xl"
        />
      </div>
    </motion.main>
  );
}
