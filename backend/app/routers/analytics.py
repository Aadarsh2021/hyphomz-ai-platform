from fastapi import APIRouter
from datetime import datetime
import random

router = APIRouter(prefix="/api/v1/analytics", tags=["analytics"])

@router.get("/real-time-metrics")
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