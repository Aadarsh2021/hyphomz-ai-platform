/**
 * Hyphomz AI Hooks
 * React hooks for easy AI/ML integration
 */

import { useState, useEffect, useCallback } from 'react';
import { hyphomzAI, ServiceRecommendation, DurationPrediction, ProviderMatch, aiUtils } from '@/lib/ai-api';

// 🎯 Personalized Recommendations Hook
export function usePersonalizedRecommendations(userId: string, location?: string) {
  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const recs = await hyphomzAI.getPersonalizedRecommendations(userId, {
        location,
        numRecommendations: 5
      });
      setRecommendations(recs);
    } catch (err) {
      setError('Failed to fetch recommendations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId, location]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    recommendations,
    loading,
    error,
    refetch: fetchRecommendations
  };
}

// 🔮 Service Duration Prediction Hook
export function useServiceDurationPrediction() {
  const [prediction, setPrediction] = useState<DurationPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predictDuration = useCallback(async (params: {
    service_type: string;
    area_sqft?: number;
    complexity?: 'low' | 'medium' | 'high';
    provider_experience?: number;
    time_of_day?: 'morning' | 'afternoon' | 'evening';
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await hyphomzAI.predictServiceDuration(params);
      setPrediction(result);
      return result;
    } catch (err) {
      setError('Failed to predict duration');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    prediction,
    loading,
    error,
    predictDuration,
    formattedDuration: prediction ? aiUtils.formatDuration(prediction.estimated_duration_minutes) : null,
    confidenceIndicator: prediction ? aiUtils.getConfidenceIndicator(prediction.confidence_score) : null
  };
}

// ⚡ Smart Provider Matching Hook
export function useProviderMatching() {
  const [providers, setProviders] = useState<ProviderMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findProviders = useCallback(async (params: {
    service_type: string;
    location: string;
    urgency?: 'urgent' | 'normal' | 'flexible';
    budget_range?: string;
    preferred_time?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const matches = await hyphomzAI.findBestProviders(params);
      setProviders(matches);
      return matches;
    } catch (err) {
      setError('Failed to find providers');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    providers,
    loading,
    error,
    findProviders,
    bestMatch: providers[0] || null,
    topMatches: providers.slice(0, 3)
  };
}

// 📈 Trending Services Hook
export function useTrendingServices() {
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const result = await hyphomzAI.getTrendingServices();
        setTrending(result.trending_services || []);
      } catch (err) {
        setError('Failed to fetch trending services');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return { trending, loading, error };
}

// 🔍 Smart Search Hook
export function useSmartSearch() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getSuggestions = useCallback(async (query: string, location?: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const result = await hyphomzAI.getSmartSearchSuggestions(query, location);
      setSuggestions(result);
    } catch (err) {
      console.error('Search suggestions error:', err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { suggestions, loading, getSuggestions };
}

// 💡 Smart Insights Hook
export function useSmartInsights(userId: string) {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchInsights = async () => {
      setLoading(true);
      try {
        const result = await hyphomzAI.getBookingInsights(userId);
        setInsights(result);
      } catch (err) {
        console.error('Failed to fetch insights:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [userId]);

  return { insights, loading };
}

// 🎨 Dynamic Pricing Hook
export function useDynamicPricing(serviceType: string, location: string) {
  const [pricing, setPricing] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!serviceType || !location) return;

    const fetchPricing = async () => {
      setLoading(true);
      try {
        const result = await hyphomzAI.getDynamicPricingInsights(serviceType, location);
        setPricing(result);
      } catch (err) {
        console.error('Failed to fetch pricing insights:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, [serviceType, location]);

  return { pricing, loading };
}

// 🚀 AI Health Status Hook
export function useAIStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkStatus = useCallback(async () => {
    try {
      await hyphomzAI.healthCheck();
      setStatus('online');
    } catch (err) {
      setStatus('offline');
    }
    setLastCheck(new Date());
  }, []);

  useEffect(() => {
    checkStatus();
    // Check every 5 minutes
    const interval = setInterval(checkStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  return { status, lastCheck, checkStatus };
}

// 📊 Real-time Analytics Hook
export function useRealTimeAnalytics() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await hyphomzAI.getRealTimeMetrics();
      setMetrics(result);
    } catch (err) {
      setError('Failed to fetch real-time metrics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
    // Update every 30 seconds
    const interval = setInterval(fetchMetrics, 30 * 1000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  return { metrics, loading, error, refetch: fetchMetrics };
}

// 🎯 Combined Smart Booking Hook
export function useSmartBooking() {
  const durationPrediction = useServiceDurationPrediction();
  const providerMatching = useProviderMatching();
  const dynamicPricing = useDynamicPricing;

  const getSmartBookingData = useCallback(async (params: {
    service_type: string;
    location: string;
    area_sqft?: number;
    complexity?: 'low' | 'medium' | 'high';
    urgency?: 'urgent' | 'normal' | 'flexible';
    preferred_time?: string;
  }) => {
    // Get duration prediction
    const duration = await durationPrediction.predictDuration({
      service_type: params.service_type,
      area_sqft: params.area_sqft,
      complexity: params.complexity
    });

    // Find best providers
    const providers = await providerMatching.findProviders({
      service_type: params.service_type,
      location: params.location,
      urgency: params.urgency,
      preferred_time: params.preferred_time
    });

    return {
      duration,
      providers,
      bestProvider: providers[0] || null
    };
  }, [durationPrediction, providerMatching]);

  return {
    getSmartBookingData,
    durationPrediction,
    providerMatching,
    loading: durationPrediction.loading || providerMatching.loading
  };
} 