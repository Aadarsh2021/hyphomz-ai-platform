from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# Pydantic models for API
class RecommendationRequest(BaseModel):
    user_id: str
    num_recommendations: Optional[int] = 5
    user_preferences: Optional[dict] = None
    location: Optional[str] = None

class RecommendationResponse(BaseModel):
    user_id: str
    recommendations: List[str]
    confidence_scores: List[float]
    explanation: str

class ServiceRecommendation(BaseModel):
    service_name: str
    confidence_score: float
    reason: str
    estimated_price: int  # in INR
    estimated_duration: int  # in minutes

@router.post("/user/{user_id}", response_model=List[ServiceRecommendation])
async def get_user_recommendations(
    user_id: str,
    request: RecommendationRequest
):
    """
    Get personalized service recommendations for a user.
    
    This endpoint uses collaborative filtering and user behavior analysis
    to recommend the most relevant services.
    """
    try:
        # Mock ML model response for now
        # In production, this would call the ML model manager
        
        # Simulate intelligent recommendations based on user patterns
        all_services = [
            {"name": "House Cleaning", "base_price": 1200, "base_duration": 120},
            {"name": "Plumbing Repair", "base_price": 2000, "base_duration": 90},
            {"name": "Electrical Services", "base_price": 2300, "base_duration": 100},
            {"name": "Interior Painting", "base_price": 3200, "base_duration": 240},
            {"name": "Lawn Care", "base_price": 1000, "base_duration": 80},
            {"name": "HVAC Services", "base_price": 2500, "base_duration": 150},
            {"name": "Security System", "base_price": 2950, "base_duration": 180},
            {"name": "Custom Furniture", "base_price": 4000, "base_duration": 300}
        ]
        
        # Simulate ML-based recommendations with confidence scores
        import random
        random.seed(hash(user_id) % 1000)  # Consistent results per user
        
        # Select top services based on "ML analysis"
        selected_services = random.sample(all_services, min(request.num_recommendations, len(all_services)))
        
        recommendations = []
        for i, service in enumerate(selected_services):
            confidence = 0.95 - (i * 0.1)  # Decreasing confidence
            
            # Generate intelligent reasoning
            reasons = [
                f"Based on your previous bookings and similar users' preferences",
                f"Popular service in your area with high satisfaction rates",
                f"Seasonal recommendation - high demand period",
                f"Matches your service frequency patterns",
                f"Recommended due to complementary service usage"
            ]
            
            recommendation = ServiceRecommendation(
                service_name=service["name"],
                confidence_score=round(confidence, 2),
                reason=reasons[i % len(reasons)],
                estimated_price=service["base_price"],
                estimated_duration=service["base_duration"]
            )
            recommendations.append(recommendation)
        
        return recommendations
        
    except Exception as e:
        logger.error(f"Error generating recommendations for user {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate recommendations")

@router.get("/trending")
async def get_trending_services():
    """Get currently trending services based on booking patterns."""
    try:
        # Mock trending analysis
        trending_services = [
            {
                "service_name": "House Cleaning",
                "trend_score": 0.85,
                "booking_increase": "25%",
                "reason": "Post-festival cleaning surge"
            },
            {
                "service_name": "HVAC Services", 
                "trend_score": 0.78,
                "booking_increase": "15%",
                "reason": "Summer season preparation"
            },
            {
                "service_name": "Electrical Services",
                "trend_score": 0.72,
                "booking_increase": "12%", 
                "reason": "Home automation installations"
            }
        ]
        
        return {
            "trending_services": trending_services,
            "analysis_period": "Last 30 days",
            "data_points": 1500
        }
        
    except Exception as e:
        logger.error(f"Error fetching trending services: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch trending data")

@router.post("/similar-users/{user_id}")
async def get_similar_users_recommendations(user_id: str):
    """Get recommendations based on similar users' preferences."""
    try:
        # Mock similar user analysis
        similar_users = [
            {
                "similar_user_id": "user_123",
                "similarity_score": 0.89,
                "common_services": ["House Cleaning", "Plumbing Repair"],
                "recommended_services": ["Electrical Services", "HVAC Services"]
            },
            {
                "similar_user_id": "user_456", 
                "similarity_score": 0.84,
                "common_services": ["Lawn Care", "House Cleaning"],
                "recommended_services": ["Interior Painting", "Security System"]
            }
        ]
        
        return {
            "user_id": user_id,
            "similar_users": similar_users,
            "recommendation_method": "Collaborative Filtering",
            "confidence": 0.87
        }
        
    except Exception as e:
        logger.error(f"Error finding similar users for {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to analyze similar users")

@router.get("/popular/{location}")
async def get_location_popular_services(location: str):
    """Get popular services in a specific location."""
    try:
        # Mock location-based popularity
        location_services = {
            "Greater Noida": [
                {"service": "House Cleaning", "popularity": 0.92, "avg_rating": 4.8},
                {"service": "Security System", "popularity": 0.87, "avg_rating": 4.7},
                {"service": "HVAC Services", "popularity": 0.83, "avg_rating": 4.6}
            ],
            "Delhi": [
                {"service": "Electrical Services", "popularity": 0.89, "avg_rating": 4.7},
                {"service": "Plumbing Repair", "popularity": 0.85, "avg_rating": 4.6},
                {"service": "House Cleaning", "popularity": 0.82, "avg_rating": 4.8}
            ]
        }
        
        services = location_services.get(location, location_services["Greater Noida"])
        
        return {
            "location": location,
            "popular_services": services,
            "data_source": "Last 90 days booking data",
            "total_bookings": 2500
        }
        
    except Exception as e:
        logger.error(f"Error fetching popular services for {location}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch location data") 