from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# Pydantic models
class DurationPredictionRequest(BaseModel):
    service_type: str
    area_sqft: Optional[float] = 1200
    complexity: str = "medium"  # low, medium, high
    provider_experience: Optional[int] = 5
    time_of_day: str = "morning"  # morning, afternoon, evening
    location: Optional[str] = "Greater Noida"

class DurationPredictionResponse(BaseModel):
    estimated_duration_minutes: int
    confidence_score: float
    factors_considered: List[str]
    duration_range: dict  # min, max

class ChurnPredictionRequest(BaseModel):
    customer_id: str
    bookings_count: int
    avg_rating_given: float
    days_since_last_booking: int
    total_spent: float
    complaint_count: int
    preferred_services: Optional[List[str]] = []

class ChurnPredictionResponse(BaseModel):
    customer_id: str
    churn_probability: float
    risk_level: str  # low, medium, high
    key_factors: List[str]
    recommended_actions: List[str]

class DemandPredictionRequest(BaseModel):
    service_type: str
    location: str
    prediction_date: datetime
    time_horizon_days: Optional[int] = 7

class DemandPredictionResponse(BaseModel):
    service_type: str
    location: str
    predicted_demand: List[dict]  # [{date, demand, confidence}]
    peak_times: List[str]
    seasonal_factors: dict

@router.post("/duration", response_model=DurationPredictionResponse)
async def predict_service_duration(request: DurationPredictionRequest):
    """
    Predict how long a service will take based on various factors.
    
    Uses machine learning to analyze historical data and predict
    service duration with confidence intervals.
    """
    try:
        # Mock ML prediction logic
        base_durations = {
            "House Cleaning": 120,
            "Plumbing Repair": 90,
            "Electrical Services": 100,
            "Interior Painting": 240,
            "Lawn Care": 80,
            "Custom Furniture": 300,
            "HVAC Services": 150,
            "Security System": 180
        }
        
        base_duration = base_durations.get(request.service_type, 120)
        
        # Apply complexity multiplier
        complexity_multipliers = {"low": 0.8, "medium": 1.0, "high": 1.5}
        duration = base_duration * complexity_multipliers[request.complexity]
        
        # Apply experience factor
        experience_factor = max(0.7, 1.2 - (request.provider_experience * 0.03))
        duration *= experience_factor
        
        # Apply area factor
        if request.area_sqft and request.service_type in ["House Cleaning", "Interior Painting"]:
            area_factor = request.area_sqft / 1200  # Normalize to average
            duration *= (0.8 + area_factor * 0.4)  # Bounded factor
        
        # Time of day factor
        time_factors = {"morning": 1.0, "afternoon": 1.1, "evening": 0.9}
        duration *= time_factors[request.time_of_day]
        
        # Ensure reasonable bounds
        duration = max(30, min(480, int(duration)))  # 30 min to 8 hours
        
        # Calculate confidence based on data quality
        confidence = 0.85 - (0.1 if request.provider_experience < 2 else 0) - \
                    (0.05 if request.complexity == "high" else 0)
        
        factors_considered = [
            f"Service type: {request.service_type}",
            f"Complexity: {request.complexity}",
            f"Provider experience: {request.provider_experience} years",
            f"Time of day: {request.time_of_day}"
        ]
        
        if request.area_sqft:
            factors_considered.append(f"Area: {request.area_sqft} sq ft")
        
        duration_range = {
            "min": max(30, int(duration * 0.8)),
            "max": min(480, int(duration * 1.3))
        }
        
        return DurationPredictionResponse(
            estimated_duration_minutes=duration,
            confidence_score=round(confidence, 2),
            factors_considered=factors_considered,
            duration_range=duration_range
        )
        
    except Exception as e:
        logger.error(f"Error predicting service duration: {e}")
        raise HTTPException(status_code=500, detail="Failed to predict duration")

@router.post("/churn", response_model=ChurnPredictionResponse)
async def predict_customer_churn(request: ChurnPredictionRequest):
    """
    Predict the likelihood of a customer churning (not booking again).
    
    Analyzes customer behavior patterns and provides actionable insights
    to improve retention.
    """
    try:
        # Mock churn prediction logic
        churn_score = 0.1  # Base probability
        
        # Factor in booking frequency
        if request.bookings_count < 3:
            churn_score += 0.3
        elif request.bookings_count > 10:
            churn_score -= 0.1
        
        # Factor in rating patterns
        if request.avg_rating_given < 3.5:
            churn_score += 0.4
        elif request.avg_rating_given > 4.5:
            churn_score -= 0.2
        
        # Factor in recency
        if request.days_since_last_booking > 90:
            churn_score += 0.5
        elif request.days_since_last_booking < 30:
            churn_score -= 0.1
        
        # Factor in complaints
        churn_score += request.complaint_count * 0.2
        
        # Factor in spending
        if request.total_spent < 5000:  # Low value customer
            churn_score += 0.2
        elif request.total_spent > 20000:  # High value customer
            churn_score -= 0.15
        
        # Bound the score
        churn_score = max(0.05, min(0.95, churn_score))
        
        # Determine risk level
        if churn_score < 0.3:
            risk_level = "low"
        elif churn_score < 0.6:
            risk_level = "medium" 
        else:
            risk_level = "high"
        
        # Generate key factors
        key_factors = []
        if request.days_since_last_booking > 60:
            key_factors.append("Long time since last booking")
        if request.avg_rating_given < 4.0:
            key_factors.append("Below average satisfaction ratings")
        if request.complaint_count > 0:
            key_factors.append("Previous complaints filed")
        if request.bookings_count < 5:
            key_factors.append("Low engagement history")
        
        # Generate recommendations
        recommended_actions = []
        if risk_level != "low":
            if request.days_since_last_booking > 45:
                recommended_actions.append("Send re-engagement campaign")
            if request.avg_rating_given < 4.0:
                recommended_actions.append("Proactive customer service outreach")
            if len(request.preferred_services) > 0:
                recommended_actions.append("Offer discount on preferred services")
            recommended_actions.append("Personalized service recommendations")
        
        return ChurnPredictionResponse(
            customer_id=request.customer_id,
            churn_probability=round(churn_score, 2),
            risk_level=risk_level,
            key_factors=key_factors if key_factors else ["Customer appears to be engaged"],
            recommended_actions=recommended_actions if recommended_actions else ["Continue regular service"]
        )
        
    except Exception as e:
        logger.error(f"Error predicting customer churn: {e}")
        raise HTTPException(status_code=500, detail="Failed to predict churn")

@router.post("/demand", response_model=DemandPredictionResponse)
async def predict_service_demand(request: DemandPredictionRequest):
    """
    Predict demand for a specific service in a location over time.
    
    Uses historical patterns, seasonal trends, and external factors
    to forecast demand.
    """
    try:
        # Mock demand prediction logic
        base_demand = {
            "House Cleaning": 15,
            "Plumbing Repair": 8, 
            "Electrical Services": 12,
            "Interior Painting": 5,
            "Lawn Care": 10,
            "HVAC Services": 7,
            "Security System": 4,
            "Custom Furniture": 3
        }
        
        service_base = base_demand.get(request.service_type, 8)
        
        # Generate predictions for the time horizon
        predictions = []
        current_date = request.prediction_date
        
        for i in range(request.time_horizon_days):
            date = current_date + timedelta(days=i)
            day_of_week = date.weekday()
            
            # Apply day-of-week pattern
            daily_demand = service_base
            if day_of_week >= 5:  # Weekend
                daily_demand *= 1.3
            
            # Add some realistic variation
            import random
            random.seed(int(date.timestamp()))
            variation = random.uniform(0.8, 1.4)
            daily_demand = int(daily_demand * variation)
            
            # Calculate confidence (higher for near-term predictions)
            confidence = max(0.6, 0.95 - (i * 0.05))
            
            predictions.append({
                "date": date.isoformat(),
                "demand": daily_demand,
                "confidence": round(confidence, 2)
            })
        
        # Determine peak times
        peak_times = ["Saturday Morning", "Sunday Afternoon"]
        if request.service_type == "House Cleaning":
            peak_times.extend(["Friday Evening", "Monday Morning"])
        elif request.service_type == "HVAC Services":
            peak_times.extend(["Summer Months", "Winter Start"])
        
        # Seasonal factors
        seasonal_factors = {
            "current_season_multiplier": 1.1,
            "upcoming_events": ["Festival Season", "Wedding Season"],
            "weather_impact": "Moderate"
        }
        
        return DemandPredictionResponse(
            service_type=request.service_type,
            location=request.location,
            predicted_demand=predictions,
            peak_times=peak_times,
            seasonal_factors=seasonal_factors
        )
        
    except Exception as e:
        logger.error(f"Error predicting demand: {e}")
        raise HTTPException(status_code=500, detail="Failed to predict demand")

@router.get("/market-trends/{location}")
async def get_market_trends(location: str):
    """Get overall market trends and insights for a location."""
    try:
        # Mock market analysis
        trends = {
            "location": location,
            "overall_growth": "12% YoY",
            "top_growing_services": [
                {"service": "Security System", "growth": "35%"},
                {"service": "HVAC Services", "growth": "28%"},
                {"service": "Electrical Services", "growth": "22%"}
            ],
            "market_saturation": {
                "House Cleaning": "High",
                "Plumbing Repair": "Medium", 
                "Security System": "Low"
            },
            "seasonal_patterns": {
                "peak_months": ["March", "April", "October", "November"],
                "low_months": ["July", "August"]
            },
            "competitive_landscape": {
                "market_leaders": ["Hyphomz", "Urban Company", "Local Providers"],
                "market_share_hyphomz": "15%",
                "opportunity_score": 8.5
            }
        }
        
        return trends
        
    except Exception as e:
        logger.error(f"Error fetching market trends for {location}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch market trends") 