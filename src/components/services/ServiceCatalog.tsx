import { motion } from 'framer-motion';
import { fadeIn, scaleUp } from '@/utils/animations';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Image from 'next/image';
import { useState } from 'react';
import BookingSummaryModal from '../BookingSummaryModal';
import { Sparkles, Clock, Star, Shield, Zap, TrendingUp, CheckCircle, Award, ArrowRight, BookOpen, Heart, Eye } from 'lucide-react';

interface ServiceCatalogProps {
  selectedCategory: string;
  selectedPrice: string;
  searchQuery: string;
}

interface Service {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  priceRange: string;
  features: string[];
  icon: string;
  color: string;
  rating?: number;
  reviews?: number;
  popularity?: 'trending' | 'popular' | 'new' | null;
}

const services: Service[] = [
  {
    id: '1',
    name: 'House Cleaning',
    title: 'House Cleaning',
    category: 'cleaning',
    description: 'Professional cleaning services for your home including deep cleaning, regular maintenance, and eco-friendly products.',
    price: 1200,
    duration: '2-3 hours',
    priceRange: 'low',
    features: ['Deep cleaning', 'Regular maintenance', 'Eco-friendly products', 'Flexible scheduling'],
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H9V9h2v8zm4 0h-2V7h2v10z"/></svg>',
    color: 'from-green-500 to-emerald-500',
    rating: 4.9,
    reviews: 2540,
    popularity: 'trending'
  },
  {
    id: '2',
    name: 'Plumbing Repair',
    title: 'Plumbing Repair',
    category: 'plumbing',
    description: 'Expert plumbing repair and maintenance services for all your residential plumbing needs.',
    price: 2000,
    duration: '1-2 hours',
    priceRange: 'medium',
    features: ['Emergency repairs', 'Installation services', 'Leak detection', 'Pipe maintenance'],
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5Z"/></svg>',
    color: 'from-blue-500 to-cyan-500',
    rating: 4.8,
    reviews: 1890,
    popularity: 'popular'
  },
  {
    id: '3',
    name: 'Electrical Services',
    title: 'Electrical Services',
    category: 'electrical',
    description: 'Certified electrical services and repairs performed by licensed electricians.',
    price: 2300,
    duration: '1-3 hours',
    priceRange: 'medium',
    features: ['Wiring installation', 'Electrical repairs', 'Safety inspections', 'Outlet installation'],
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13,10V3L4,14H11V21L20,10H13Z"/></svg>',
    color: 'from-yellow-500 to-amber-500',
    rating: 4.7,
    reviews: 1456,
    popularity: null
  },
  {
    id: '4',
    name: 'Interior Painting',
    title: 'Interior Painting',
    category: 'painting',
    description: 'Professional painting services for interior and exterior spaces with premium quality paints.',
    price: 3200,
    duration: '4-6 hours',
    priceRange: 'high',
    features: ['Interior painting', 'Exterior painting', 'Custom color matching', 'Surface preparation'],
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.42,8.58L19.5,7.5L16.5,4.5L15.42,5.58L13.21,7.79C13.43,8.21 13.96,8.5 14.5,8.5C15.33,8.5 16,7.83 16,7C16,6.17 15.33,5.5 14.5,5.5C13.67,5.5 13,6.17 13,7C13,7.54 13.29,8.07 13.71,8.29L11.5,10.5L12.08,11.08L18.42,8.58Z"/></svg>',
    color: 'from-red-500 to-pink-500',
    rating: 4.6,
    reviews: 987,
    popularity: 'new'
  },
  {
    id: '5',
    name: 'Lawn Care',
    title: 'Lawn Care',
    category: 'landscaping',
    description: 'Complete garden and landscape maintenance services to keep your outdoor space beautiful.',
    price: 1000,
    duration: '2-4 hours',
    priceRange: 'low',
    features: ['Lawn mowing', 'Tree trimming', 'Garden maintenance', 'Seasonal cleanup'],
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M11,20H13V22H11V20Z"/></svg>',
    color: 'from-lime-500 to-green-500',
    rating: 4.5,
    reviews: 2134,
    popularity: 'popular'
  },
  {
    id: '6',
    name: 'Custom Furniture',
    title: 'Custom Furniture',
    category: 'carpentry',
    description: 'Custom carpentry and woodwork services including furniture making and repairs.',
    price: 4000,
    duration: '4-8 hours',
    priceRange: 'high',
    features: ['Custom furniture', 'Wood repairs', 'Cabinet installation', 'Trim work'],
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.9,8.85C20.85,8.8 20.8,8.75 20.75,8.7C20.7,8.65 20.65,8.6 20.6,8.55C20.55,8.5 20.5,8.45 20.45,8.4C20.4,8.35 20.35,8.3 20.3,8.25L12.35,1.15C12.25,1.05 12.15,1 12,1C11.85,1 11.75,1.05 11.65,1.15L3.7,8.25C3.65,8.3 3.6,8.35 3.55,8.4C3.5,8.45 3.45,8.5 3.4,8.55C3.35,8.6 3.3,8.65 3.25,8.7C3.2,8.75 3.15,8.8 3.1,8.85C3.05,8.9 3,8.95 3,9V15C3,16.1 3.9,17 5,17H19C20.1,17 21,16.1 21,15V9C21,8.95 20.95,8.9 20.9,8.85Z"/></svg>',
    color: 'from-orange-500 to-amber-500',
    rating: 4.9,
    reviews: 567,
    popularity: 'trending'
  },
  {
    id: '7',
    name: 'HVAC Services',
    title: 'HVAC Services',
    category: 'hvac',
    description: 'Heating, ventilation, and air conditioning system installation, repair, and maintenance.',
    price: 2500,
    duration: '2-4 hours',
    priceRange: 'medium',
    features: ['AC installation', 'Heating repair', 'Duct cleaning', 'System maintenance'],
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.5,6.5C12.5,5.67 11.83,5 11,5C10.17,5 9.5,5.67 9.5,6.5V10.5C9.5,11.33 10.17,12 11,12C11.83,12 12.5,11.33 12.5,10.5V6.5M16.5,6.5C16.5,5.67 15.83,5 15,5C14.17,5 13.5,5.67 13.5,6.5V10.5C13.5,11.33 14.17,12 15,12C15.83,12 16.5,11.33 16.5,10.5V6.5Z"/></svg>',
    color: 'from-sky-500 to-blue-500',
    rating: 4.4,
    reviews: 1234,
    popularity: null
  },
  {
    id: '8',
    name: 'Security System',
    title: 'Security System',
    category: 'security',
    description: 'Professional security system installation and monitoring services for your peace of mind.',
    price: 2950,
    duration: '3-5 hours',
    priceRange: 'high',
    features: ['System installation', '24/7 monitoring', 'Camera setup', 'Access control'],
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V16H16V18H8V16H9.2V10C9.2,8.6 10.6,7 12,7Z"/></svg>',
    color: 'from-purple-500 to-indigo-500',
    rating: 4.8,
    reviews: 890,
    popularity: 'new'
  }
];

export default function ServiceCatalog({
  selectedCategory,
  selectedPrice,
  searchQuery,
}: ServiceCatalogProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Filter services based on selected filters and search query
  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesPrice = selectedPrice === 'all' || service.priceRange === selectedPrice;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (bookingDetails: any) => {
    console.log('Booking confirmed:', bookingDetails);
    // Here you would typically send the booking to your backend
    alert(`Booking confirmed for ${bookingDetails.service.name} on ${bookingDetails.selectedDate} at ${bookingDetails.selectedTime}!`);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  const getPopularityBadge = (popularity: string | null | undefined) => {
    if (!popularity) return null;
    
    const configs = {
      trending: { color: 'from-red-500 to-pink-500', icon: TrendingUp, text: 'Trending' },
      popular: { color: 'from-purple-500 to-indigo-500', icon: Star, text: 'Popular' },
      new: { color: 'from-green-500 to-emerald-500', icon: Sparkles, text: 'New' }
    };
    
    const config = configs[popularity as keyof typeof configs];
    if (!config) return null;
    
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`absolute -top-3 -right-3 bg-gradient-to-r ${config.color} text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10`}
      >
        <div className="flex items-center gap-1">
          <config.icon className="h-3 w-3" />
          <span>{config.text}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      variants={fadeIn}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-200/8 to-blue-200/8 dark:from-indigo-900/8 dark:to-blue-900/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-purple-200/8 to-pink-200/8 dark:from-purple-900/8 dark:to-pink-900/8 rounded-full blur-3xl"
        />
      </div>

      {/* Enhanced Results count with premium styling */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl blur-sm"></div>
        <div className="relative p-8 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-2xl border-2 border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl shadow-lg"
              >
                <BookOpen className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <motion.p 
                  className="text-2xl font-black text-gray-900 dark:text-white mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'} Found
                  {selectedCategory !== 'all' && (
                    <motion.span 
                      className="ml-3 text-indigo-600 dark:text-indigo-400 font-bold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      in {selectedCategory}
                    </motion.span>
                  )}
                </motion.p>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">AI-powered matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Quality assured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Instant booking</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Live status indicator */}
            <div className="hidden md:flex items-center gap-3 bg-white dark:bg-gray-800 px-6 py-3 rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-lg">
              <motion.div 
                className="h-3 w-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Live availability</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Eye className="h-4 w-4 text-indigo-500" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Service Grid */}
      {filteredServices.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block p-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full mb-8"
          >
            <BookOpen className="h-16 w-16 text-gray-400" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No services found</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Try adjusting your filters or search query to find the perfect service for your needs.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredCard(service.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative mb-16"
            >
              {/* Enhanced background glow effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                animate={hoveredCard === service.id ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <Card 
                variant="gradient" 
                className="relative h-full p-8 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-2 border-gray-200/50 dark:border-gray-700/50 shadow-xl group-hover:shadow-2xl transition-all duration-500 overflow-visible"
              >
                {/* Enhanced background pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-xl" />
                </div>

                {/* Popularity Badge */}
                <div className="relative z-20">
                  {getPopularityBadge(service.popularity)}
                </div>

                {/* Service Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`p-4 bg-gradient-to-r ${service.color} rounded-2xl shadow-lg`}
                    >
                      <div 
                        className="h-8 w-8 text-white" 
                        dangerouslySetInnerHTML={{ __html: service.icon }}
                      />
                    </motion.div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                    >
                      <Heart className="h-5 w-5" />
                    </motion.button>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Enhanced Rating and Reviews */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 px-4 py-2 rounded-full border border-yellow-200 dark:border-yellow-800">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-gray-900 dark:text-white">{service.rating}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{service.duration}</span>
                  </div>
                </div>

                {/* Enhanced Features */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    What's Included
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <div className="h-1.5 w-1.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Price and CTA */}
                <div className="flex items-center justify-between pt-6 border-t-2 border-gray-200/50 dark:border-gray-700/50">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Starting from</p>
                    <motion.p 
                      className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${service.color}`}
                      animate={hoveredCard === service.id ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 1 }}
                    >
                      ₹{service.price.toLocaleString()}
                    </motion.p>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => handleBookService(service)}
                      className={`bg-gradient-to-r ${service.color} text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group`}
                    >
                      <span>Book Now</span>
                      <motion.div
                        animate={{ x: hoveredCard === service.id ? [0, 5, 0] : 0 }}
                        transition={{ duration: 0.5, repeat: hoveredCard === service.id ? Infinity : 0 }}
                      >
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>

                {/* Floating stats on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ 
                    opacity: hoveredCard === service.id ? 1 : 0,
                    scale: hoveredCard === service.id ? 1 : 0.8,
                    y: hoveredCard === service.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-16 left-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 pointer-events-none z-50"
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">98%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">24/7</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Available</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        <Award className="h-5 w-5 mx-auto" />
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Certified</div>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

             {/* Enhanced Booking Modal */}
       {selectedService && (
         <BookingSummaryModal
           isOpen={isBookingModalOpen}
           onClose={handleCloseModal}
           service={selectedService}
           onConfirmBooking={handleConfirmBooking}
         />
       )}
    </motion.div>
  );
} 