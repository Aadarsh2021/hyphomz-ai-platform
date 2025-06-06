/**
 * Hyphomz AI/ML API Integration
 * Connects frontend with the intelligent ML backend
 */

const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8001';

// Types for AI API responses
export interface ServiceRecommendation {
  service_name: string;
  confidence_score: number;
  reason: string;
  estimated_price: number;
  estimated_duration: number;
}

export interface DurationPrediction {
  estimated_duration_minutes: number;
  confidence_score: number;
  factors_considered: string[];
  duration_range: {
    min: number;
    max: number;
  };
}

export interface ChurnPrediction {
  customer_id: string;
  churn_probability: number;
  risk_level: 'low' | 'medium' | 'high';
  key_factors: string[];
  recommended_actions: string[];
}

export interface ProviderMatch {
  provider_id: string;
  name: string;
  rating: number;
  experience_years: number;
  distance_km: number;
  estimated_arrival: string;
  price_estimate: number;
  match_score: number;
  availability_status: string;
}

export interface TrendingService {
  service_name: string;
  trend_score: number;
  booking_increase: string;
  reason: string;
}

// AI API Class
class HyphomzAI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = AI_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`AI API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI API Request failed:', error);
      throw error;
    }
  }

  // 🎯 RECOMMENDATIONS
  async getPersonalizedRecommendations(
    userId: string,
    options: {
      numRecommendations?: number;
      location?: string;
      userPreferences?: any;
    } = {}
  ): Promise<ServiceRecommendation[]> {
    return this.request<ServiceRecommendation[]>(
      `/api/v1/recommendations/user/${userId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          num_recommendations: options.numRecommendations || 5,
          location: options.location,
          user_preferences: options.userPreferences,
        }),
      }
    );
  }

  async getTrendingServices(): Promise<{ trending_services: TrendingService[] }> {
    return this.request('/api/v1/recommendations/trending');
  }

  async getPopularServicesByLocation(location: string) {
    return this.request(`/api/v1/recommendations/popular/${encodeURIComponent(location)}`);
  }

  // 🔮 PREDICTIONS
  async predictServiceDuration(params: {
    service_type: string;
    area_sqft?: number;
    complexity?: 'low' | 'medium' | 'high';
    provider_experience?: number;
    time_of_day?: 'morning' | 'afternoon' | 'evening';
    location?: string;
  }): Promise<DurationPrediction> {
    return this.request<DurationPrediction>('/api/v1/predictions/duration', {
      method: 'POST',
      body: JSON.stringify({
        service_type: params.service_type,
        area_sqft: params.area_sqft || 1200,
        complexity: params.complexity || 'medium',
        provider_experience: params.provider_experience || 5,
        time_of_day: params.time_of_day || 'morning',
        location: params.location,
      }),
    });
  }

  async predictCustomerChurn(params: {
    customer_id: string;
    bookings_count: number;
    avg_rating_given: number;
    days_since_last_booking: number;
    total_spent: number;
    complaint_count: number;
    preferred_services?: string[];
  }): Promise<ChurnPrediction> {
    return this.request<ChurnPrediction>('/api/v1/predictions/churn', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async predictDemand(params: {
    service_type: string;
    location: string;
    prediction_date: string;
    time_horizon_days?: number;
  }) {
    return this.request('/api/v1/predictions/demand', {
      method: 'POST',
      body: JSON.stringify({
        ...params,
        time_horizon_days: params.time_horizon_days || 7,
      }),
    });
  }

  // ⚡ PROVIDER MATCHING
  async findBestProviders(params: {
    service_type: string;
    location: string;
    urgency?: 'urgent' | 'normal' | 'flexible';
    budget_range?: string;
    preferred_time?: string;
  }): Promise<ProviderMatch[]> {
    return this.request<ProviderMatch[]>('/api/v1/matching/find-best-provider', {
      method: 'POST',
      body: JSON.stringify({
        service_type: params.service_type,
        location: params.location,
        urgency: params.urgency || 'normal',
        budget_range: params.budget_range,
        preferred_time: params.preferred_time,
      }),
    });
  }

  async getProviderAvailability(providerId: string) {
    return this.request(`/api/v1/matching/provider-availability/${providerId}`);
  }

  // 📊 ANALYTICS
  async getServicePerformanceAnalytics(params: {
    start_date: string;
    end_date: string;
    location?: string;
    service_types?: string[];
  }) {
    return this.request('/api/v1/analytics/service-performance', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getRealTimeMetrics() {
    return this.request('/api/v1/analytics/real-time-metrics');
  }

  async getBusinessIntelligence(metricType: 'revenue-optimization' | 'operational-efficiency' | 'customer-experience') {
    return this.request(`/api/v1/analytics/business-intelligence/${metricType}`);
  }

  // 🔍 SMART SEARCH & SUGGESTIONS
  async getSmartSearchSuggestions(query: string, location?: string) {
    // This could be enhanced to use AI for better search
    const suggestions = [
      'House Cleaning',
      'Plumbing Repair',
      'Electrical Services',
      'Interior Painting',
      'Lawn Care',
      'HVAC Services',
      'Security System',
      'Custom Furniture'
    ].filter(service => 
      service.toLowerCase().includes(query.toLowerCase())
    );

    return suggestions;
  }

  // 💡 SMART INSIGHTS
  async getBookingInsights(userId: string) {
    // Mock implementation - could be enhanced with real ML
    return {
      next_recommended_service: 'House Cleaning',
      best_booking_time: 'Saturday Morning',
      cost_savings_tip: 'Book multiple services together for 10% discount',
      seasonal_recommendation: 'Perfect time for HVAC maintenance before summer'
    };
  }

  // 🎨 DYNAMIC PRICING INSIGHTS
  async getDynamicPricingInsights(serviceType: string, location: string, date?: string) {
    // Mock implementation for dynamic pricing
    return {
      current_demand: 'medium',
      price_trend: 'stable',
      best_booking_time: 'Tuesday afternoon for lower rates',
      surge_pricing_active: false,
      estimated_savings: '₹200 if booked on weekday'
    };
  }

  // 🚀 HEALTH CHECK
  async healthCheck() {
    try {
      return await this.request('/health');
    } catch (error) {
      return { 
        status: 'offline', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

// Export singleton instance
export const hyphomzAI = new HyphomzAI();

// Utility functions for common AI operations
export const aiUtils = {
  // Format duration in user-friendly way
  formatDuration: (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins} minutes`;
    if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${hours}h ${mins}m`;
  },

  // Get risk color for churn prediction
  getChurnRiskColor: (riskLevel: string): string => {
    switch (riskLevel) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  },

  // Get confidence indicator
  getConfidenceIndicator: (score: number): string => {
    if (score >= 0.8) return '🔥 High Confidence';
    if (score >= 0.6) return '✅ Good Confidence';
    if (score >= 0.4) return '⚠️ Medium Confidence';
    return '❓ Low Confidence';
  },

  // Format price with currency
  formatPrice: (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
};

export default hyphomzAI; 