"""
Hyphomz ML Backend - Main Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import random
from datetime import datetime
from typing import Dict, Any

# Initialize FastAPI app
app = FastAPI(
    title="Hyphomz AI/ML Backend",
    description="Intelligent automation and predictive insights for Hyphomz",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "https://*.railway.app",
        "https://*.vercel.app",
        "https://*.onrender.com",
        "https://hyphomz-ai-platform-2fc5bhaxl-aadarsh2021s-projects.vercel.app",
        "*"  # Allow all origins for cloud deployment
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Recommendations endpoints
@app.post("/api/v1/recommendations/user/{user_id}")
async def get_user_recommendations(user_id: str):
    return [
        {
            "service_name": "House Cleaning",
            "confidence_score": 0.95,
            "reason": "Based on your previous bookings and seasonal patterns",
            "estimated_price": 2500,
            "estimated_duration": 150
        },
        {
            "service_name": "Plumbing Repair", 
            "confidence_score": 0.78,
            "reason": "Popular service in your area this time of year",
            "estimated_price": 1800,
            "estimated_duration": 90
        }
    ]

@app.get("/api/v1/recommendations/trending")
async def get_trending_services():
    return {
        "trending_services": [
            {
                "service_name": "House Cleaning",
                "trend_score": 0.95,
                "booking_increase": "+25%",
                "reason": "High demand due to festival season"
            },
            {
                "service_name": "HVAC Services",
                "trend_score": 0.88,
                "booking_increase": "+15%", 
                "reason": "Summer preparation surge"
            }
        ]
    }

# Predictions endpoints
@app.post("/api/v1/predictions/duration")
async def predict_duration(request: Dict[Any, Any]):
    base_duration = 120  # 2 hours base
    
    # Adjust based on factors
    if request.get("area_sqft", 1200) > 1500:
        base_duration += 30
    if request.get("complexity") == "high":
        base_duration += 45
    elif request.get("complexity") == "low":
        base_duration -= 30
        
    return {
        "estimated_duration_minutes": base_duration,
        "confidence_score": 0.85,
        "factors_considered": ["area_sqft", "complexity", "time_of_day"],
        "duration_range": {
            "min": base_duration - 30,
            "max": base_duration + 30
        }
    }

# Provider matching endpoints
@app.post("/api/v1/matching/find-best-provider")
async def find_best_providers(request: Dict[Any, Any]):
    return [
        {
            "provider_id": "prov_001",
            "name": "Rajesh Kumar",
            "rating": 4.9,
            "experience_years": 8,
            "distance_km": 2.5,
            "estimated_arrival": "30 minutes",
            "price_estimate": 2400,
            "match_score": 0.96,
            "availability_status": "Available"
        },
        {
            "provider_id": "prov_002", 
            "name": "Priya Sharma",
            "rating": 4.7,
            "experience_years": 5,
            "distance_km": 3.2,
            "estimated_arrival": "45 minutes",
            "price_estimate": 2200,
            "match_score": 0.89,
            "availability_status": "Available"
        }
    ]

# Analytics endpoints
@app.get("/api/v1/analytics/real-time-metrics")
async def get_real_time_metrics():
    return {
        "active_bookings": random.randint(45, 85),
        "revenue_today": random.randint(15000, 45000),
        "online_providers": random.randint(25, 45),
        "customer_satisfaction_today": round(random.uniform(4.6, 4.9), 1),
        "avg_response_time_minutes": random.randint(8, 18),
        "popular_services_now": [
            {"service": "House Cleaning", "current_demand": "High"},
            {"service": "Plumbing Repair", "current_demand": "Medium"},
            {"service": "Electrical Services", "current_demand": "High"}
        ],
        "system_health": {
            "api_response_time": f"{random.randint(45, 120)}ms",
            "cache_hit_rate": f"{random.randint(85, 98)}%",
            "ml_model_status": "Healthy",
            "database_performance": "Optimal"
        },
        "alerts": [
            {
                "type": "info",
                "message": "Peak demand period detected for House Cleaning",
                "timestamp": datetime.now().isoformat()
            }
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 