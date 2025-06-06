# Provider Matching API

from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class ProviderMatchRequest(BaseModel):
    service_type: str
    location: str
    urgency: str = "normal"  # urgent, normal, flexible
    budget_range: Optional[str] = None
    preferred_time: Optional[str] = None

class ProviderMatch(BaseModel):
    provider_id: str
    name: str
    rating: float
    experience_years: int
    distance_km: float
    estimated_arrival: str
    price_estimate: int
    match_score: float
    availability_status: str

@router.post("/find-best-provider", response_model=List[ProviderMatch])
async def find_best_provider(request: ProviderMatchRequest):
    """Find the best matching providers for a service request using ML algorithms."""
    try:
        # Mock provider matching logic
        mock_providers = [
            ProviderMatch(
                provider_id="prov_001",
                name="Rajesh Kumar",
                rating=4.9,
                experience_years=8,
                distance_km=2.3,
                estimated_arrival="30-45 mins",
                price_estimate=2000,
                match_score=0.95,
                availability_status="available"
            ),
            ProviderMatch(
                provider_id="prov_002",
                name="Priya Sharma", 
                rating=4.8,
                experience_years=6,
                distance_km=3.1,
                estimated_arrival="45-60 mins",
                price_estimate=1950,
                match_score=0.89,
                availability_status="available"
            ),
            ProviderMatch(
                provider_id="prov_003",
                name="Amit Singh",
                rating=4.7,
                experience_years=10,
                distance_km=4.2,
                estimated_arrival="60-75 mins", 
                price_estimate=2100,
                match_score=0.87,
                availability_status="busy_but_available"
            )
        ]
        
        # Sort by match score (highest first)
        sorted_providers = sorted(mock_providers, key=lambda x: x.match_score, reverse=True)
        
        return sorted_providers[:5]  # Return top 5 matches
        
    except Exception as e:
        logger.error(f"Error finding providers: {e}")
        raise HTTPException(status_code=500, detail="Failed to find providers")

@router.get("/provider-availability/{provider_id}")
async def get_provider_availability(provider_id: str):
    """Get real-time availability of a specific provider."""
    return {
        "provider_id": provider_id,
        "status": "available",
        "next_available_slot": "2024-01-15T14:30:00",
        "current_bookings": 2,
        "max_daily_bookings": 8
    }
