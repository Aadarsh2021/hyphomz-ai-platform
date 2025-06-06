import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations';
import Card from '../ui/Card';
import Input from '../ui/Input';
import { Search, Filter, Sparkles, Star, Zap, DollarSign, Grid, Brain, Shield, Award, TrendingUp, CheckCircle, Clock, ArrowRight } from 'lucide-react';

interface ServiceFiltersProps {
  selectedCategory: string;
  selectedPrice: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onPriceChange: (price: string) => void;
  onSearchChange: (query: string) => void;
}

const categories = [
  { 
    id: 'all', 
    name: 'All Services', 
    icon: Grid, 
    color: 'from-gray-500 to-gray-600',
    count: 50,
    description: 'Browse all available services'
  },
  { 
    id: 'cleaning', 
    name: 'Cleaning', 
    icon: Sparkles, 
    color: 'from-green-500 to-emerald-500',
    count: 8,
    description: 'Home and office cleaning'
  },
  { 
    id: 'plumbing', 
    name: 'Plumbing', 
    icon: Zap, 
    color: 'from-blue-500 to-cyan-500',
    count: 6,
    description: 'Repairs and installations'
  },
  { 
    id: 'electrical', 
    name: 'Electrical', 
    icon: Star, 
    color: 'from-yellow-500 to-amber-500',
    count: 5,
    description: 'Wiring and safety checks'
  },
  { 
    id: 'painting', 
    name: 'Painting', 
    icon: Brain, 
    color: 'from-purple-500 to-indigo-500',
    count: 4,
    description: 'Interior and exterior'
  },
  { 
    id: 'landscaping', 
    name: 'Landscaping', 
    icon: Award, 
    color: 'from-green-600 to-teal-500',
    count: 7,
    description: 'Garden and lawn care'
  },
  { 
    id: 'carpentry', 
    name: 'Carpentry', 
    icon: Shield, 
    color: 'from-amber-600 to-orange-500',
    count: 3,
    description: 'Custom woodwork'
  },
  { 
    id: 'hvac', 
    name: 'HVAC', 
    icon: Filter, 
    color: 'from-cyan-500 to-blue-500',
    count: 4,
    description: 'Heating and cooling'
  },
  { 
    id: 'security', 
    name: 'Security', 
    icon: Star, 
    color: 'from-red-500 to-pink-500',
    count: 3,
    description: 'Safety systems'
  },
];

const priceRanges = [
  { 
    id: 'all', 
    name: 'All Prices', 
    icon: DollarSign, 
    color: 'from-gray-500 to-gray-600',
    range: 'Any budget',
    services: 50
  },
  { 
    id: 'low', 
    name: 'Budget Friendly', 
    icon: DollarSign, 
    color: 'from-green-500 to-emerald-500',
    range: '₹500 - ₹1500',
    services: 15
  },
  { 
    id: 'medium', 
    name: 'Standard', 
    icon: DollarSign, 
    color: 'from-blue-500 to-cyan-500',
    range: '₹1500 - ₹2500',
    services: 20
  },
  { 
    id: 'high', 
    name: 'Premium', 
    icon: DollarSign, 
    color: 'from-purple-500 to-indigo-500',
    range: '₹2500+',
    services: 15
  },
];

export default function ServiceFilters({
  selectedCategory,
  selectedPrice,
  searchQuery,
  onCategoryChange,
  onPriceChange,
  onSearchChange,
}: ServiceFiltersProps) {
  return (
    <motion.div 
      variants={fadeIn}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Enhanced Background with animations */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-200/10 to-blue-200/10 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-200/5 to-pink-200/5 dark:from-purple-900/5 dark:to-pink-900/5 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            className={`absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full blur-sm`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 20}%`
            }}
          />
        ))}
      </div>

      <Card variant="gradient" className="relative z-10 p-10 space-y-10 sticky top-24 max-h-[calc(100vh-6rem)] backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 border-2 border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-y-auto">
        {/* Enhanced AI Filter Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center pb-8 border-b-2 border-gradient-to-r from-indigo-200/50 via-blue-200/50 to-purple-200/50 dark:border-gray-700/50 relative"
        >
          {/* Header background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 to-blue-50/30 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-xl -m-4" />
          
          <div className="relative z-10">
            <motion.div 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-4 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="h-5 w-5" />
              </motion.div>
              <span>AI-Powered Filters</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
            </motion.div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
              Find Your Perfect Service
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              Smart filtering with instant results and AI recommendations
            </p>
          </div>
        </motion.div>

        {/* Enhanced Smart Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="flex items-center gap-6 mb-8">
            <motion.div 
              className="p-5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
            >
              <Search className="h-6 w-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Smart Search
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </motion.div>
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">AI-powered service discovery</p>
            </div>
          </div>
          
          <div className="relative group">
            <Input
              type="text"
              label=""
              placeholder="Describe what you need... (e.g., 'deep house cleaning')"
              value={searchQuery}
              onChange={onSearchChange}
              className="pl-16 pr-14 border-2 border-indigo-200 dark:border-indigo-800 focus:border-indigo-500 rounded-xl text-xl py-5 group-hover:shadow-lg transition-all duration-300"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <Search className="h-6 w-6 text-indigo-500" />
            </div>
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => onSearchChange('')}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
            
            {/* Search suggestions */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-[100]"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                  <Brain className="h-3 w-3" />
                  AI Suggestions
                </div>
                <div className="space-y-1">
                  {['Deep cleaning service', 'Plumbing repair', 'Electrical installation'].map((suggestion, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="w-full text-left text-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      onClick={() => onSearchChange(suggestion)}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Enhanced Service Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-6 mb-10">
            <motion.div 
              className="p-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
            >
              <Filter className="h-6 w-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Service Categories
                <span className="text-base bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-full">
                  {categories.length}
                </span>
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">Browse by service type</p>
            </div>
          </div>
          
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <motion.label
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                                                        whileHover={{ x: 8, scale: 1.02, transition: { duration: 0.2 } }}
                    className={`flex items-center space-x-4 cursor-pointer group p-5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                       isSelected
                         ? 'bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-2 border-indigo-300 dark:border-indigo-700 shadow-lg'
                         : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800'
                   }`}
                >
                  {/* Selection background effect */}
                  {isSelected && (
                    <motion.div
                      layoutId="selectedCategory"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-100/50 to-blue-100/50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                                                              className={`relative z-10 p-4 rounded-lg bg-gradient-to-r ${category.color} shadow-md`}
                   >
                     <IconComponent className="h-6 w-6 text-white" />
                   </motion.div>
                  
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={isSelected}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-5 h-5 text-indigo-600 border-2 border-gray-300 focus:ring-indigo-500 focus:ring-2 relative z-10"
                  />
                  
                  <div className="flex-1 relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-base font-bold transition-colors ${
                        isSelected 
                          ? 'text-indigo-600 dark:text-indigo-400' 
                          : 'text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                      }`}>
                        {category.name}
                      </span>
                      <motion.span 
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          isSelected 
                            ? 'bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                        animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {category.count} services
                      </motion.span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <CheckCircle className="h-5 w-5 text-indigo-500" />
                    </motion.div>
                  )}
                  
                                     {/* Trending indicator for popular categories */}
                   {['cleaning', 'plumbing', 'electrical'].includes(category.id) && (
                     <motion.div
                       initial={{ opacity: 0, scale: 0 }}
                       animate={{ opacity: 0.7, scale: 1 }}
                       transition={{ delay: 0.5 + index * 0.1 }}
                       className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10"
                     >
                      <TrendingUp className="h-2 w-2" />
                      <span className="text-xs font-bold">Hot</span>
                    </motion.div>
                  )}
                </motion.label>
              );
            })}
          </div>
        </motion.div>

        {/* Enhanced Price Ranges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-6 mb-10">
            <motion.div 
              className="p-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
            >
              <DollarSign className="h-6 w-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Price Range
                <Clock className="h-5 w-5 text-gray-500" />
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">Filter by budget</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {priceRanges.map((range, index) => {
              const IconComponent = range.icon;
              const isSelected = selectedPrice === range.id;
              
              return (
                <motion.label
                  key={range.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                                                        whileHover={{ x: 8, scale: 1.02, transition: { duration: 0.2 } }}
                    className={`flex items-center space-x-4 cursor-pointer group p-5 rounded-xl transition-all duration-300 relative overflow-hidden ${
                       isSelected
                         ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 shadow-lg'
                         : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800'
                   }`}
                >
                  {/* Selection background effect */}
                  {isSelected && (
                    <motion.div
                      layoutId="selectedPrice"
                      className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                                         className={`relative z-10 p-4 rounded-lg bg-gradient-to-r ${range.color} shadow-md`}
                   >
                     <IconComponent className="h-6 w-6 text-white" />
                   </motion.div>
                  
                  <input
                    type="radio"
                    name="price"
                    value={range.id}
                    checked={isSelected}
                    onChange={(e) => onPriceChange(e.target.value)}
                    className="w-5 h-5 text-purple-600 border-2 border-gray-300 focus:ring-purple-500 focus:ring-2 relative z-10"
                  />
                  
                  <div className="flex-1 relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-base font-bold transition-colors ${
                        isSelected 
                          ? 'text-purple-600 dark:text-purple-400' 
                          : 'text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                      }`}>
                        {range.name}
                      </span>
                      <motion.span 
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          isSelected 
                            ? 'bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                        animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {range.services} services
                      </motion.span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {range.range}
                    </p>
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                    </motion.div>
                  )}
                </motion.label>
              );
            })}
          </div>
        </motion.div>

        {/* Enhanced Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t-2 border-gray-200/50 dark:border-gray-700/50"
        >
          <h4 className="text-base font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            Quick Actions
          </h4>
          
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onCategoryChange('all');
                onPriceChange('all');
                onSearchChange('');
              }}
              className="w-full p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-between group"
            >
              <span>Clear All Filters</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onCategoryChange('cleaning');
                onPriceChange('low');
              }}
              className="w-full p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl text-green-700 dark:text-green-400 font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-between group"
            >
              <span>Popular: Cleaning Service</span>
              <TrendingUp className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onCategoryChange('all');
                onPriceChange('high');
              }}
              className="w-full p-4 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl text-purple-700 dark:text-purple-400 font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-between group"
            >
              <span>Premium Services</span>
              <Award className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* AI Recommendation Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="inline-block p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mb-3"
          >
            <Brain className="h-6 w-6 text-white" />
          </motion.div>
          <h5 className="font-bold text-gray-900 dark:text-white mb-2">AI-Powered Matching</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Our intelligent system learns your preferences to show the most relevant services
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
} 