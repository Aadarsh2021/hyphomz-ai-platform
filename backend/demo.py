#!/usr/bin/env python3
"""
Hyphomz AI/ML Backend Demo
This script demonstrates the AI capabilities without running the full server.
"""

import json
import random
from datetime import datetime, timedelta

def demo_service_duration_prediction():
    """Demo: Predict how long a service will take"""
    print("\n🔮 SERVICE DURATION PREDICTION")
    print("=" * 50)
    
    # Mock input
    service_request = {
        "service_type": "House Cleaning",
        "area_sqft": 1500,
        "complexity": "medium",
        "provider_experience": 7,
        "time_of_day": "morning"
    }
    
    print(f"📋 Service Request: {json.dumps(service_request, indent=2)}")
    
    # Mock ML prediction
    base_duration = 120  # House Cleaning base: 120 minutes
    area_factor = service_request["area_sqft"] / 1200  # Adjust for area
    complexity_factor = {"low": 0.8, "medium": 1.0, "high": 1.5}[service_request["complexity"]]
    experience_factor = max(0.7, 1.2 - (service_request["provider_experience"] * 0.03))
    
    predicted_duration = int(base_duration * area_factor * complexity_factor * experience_factor)
    
    prediction = {
        "estimated_duration_minutes": predicted_duration,
        "confidence_score": 0.87,
        "factors_considered": [
            f"Service type: {service_request['service_type']}",
            f"Area: {service_request['area_sqft']} sq ft",
            f"Complexity: {service_request['complexity']}",
            f"Provider experience: {service_request['provider_experience']} years"
        ],
        "duration_range": {
            "min": int(predicted_duration * 0.8),
            "max": int(predicted_duration * 1.3)
        }
    }
    
    print(f"🤖 AI Prediction: {json.dumps(prediction, indent=2)}")
    print(f"✅ Result: Service will take approximately {predicted_duration} minutes ({predicted_duration//60}h {predicted_duration%60}m)")

def demo_customer_churn_prediction():
    """Demo: Predict if a customer might churn"""
    print("\n⚠️  CUSTOMER CHURN PREDICTION")
    print("=" * 50)
    
    # Mock customer data
    customer_data = {
        "customer_id": "cust_12345",
        "bookings_count": 3,
        "avg_rating_given": 3.8,
        "days_since_last_booking": 75,
        "total_spent": 8500,
        "complaint_count": 2
    }
    
    print(f"👤 Customer Profile: {json.dumps(customer_data, indent=2)}")
    
    # Mock churn prediction logic
    churn_score = 0.1
    if customer_data["bookings_count"] < 5: churn_score += 0.3
    if customer_data["avg_rating_given"] < 4.0: churn_score += 0.2
    if customer_data["days_since_last_booking"] > 60: churn_score += 0.4
    if customer_data["complaint_count"] > 1: churn_score += 0.3
    
    churn_score = min(0.95, churn_score)
    risk_level = "high" if churn_score > 0.6 else "medium" if churn_score > 0.3 else "low"
    
    prediction = {
        "customer_id": customer_data["customer_id"],
        "churn_probability": round(churn_score, 2),
        "risk_level": risk_level,
        "key_factors": [
            "Long time since last booking (75 days)",
            "Below average satisfaction (3.8/5)",
            "Multiple complaints filed",
            "Low engagement (only 3 bookings)"
        ],
        "recommended_actions": [
            "Send re-engagement campaign with discount",
            "Proactive customer service outreach",
            "Offer personalized service recommendations",
            "Schedule follow-up call to address concerns"
        ]
    }
    
    print(f"🤖 AI Analysis: {json.dumps(prediction, indent=2)}")
    print(f"🚨 Alert: {risk_level.upper()} risk customer - {int(churn_score*100)}% chance of churning")

def demo_service_recommendations():
    """Demo: Generate personalized recommendations"""
    print("\n🎯 PERSONALIZED RECOMMENDATIONS")
    print("=" * 50)
    
    user_id = "user_456"
    user_history = {
        "previous_services": ["House Cleaning", "Plumbing Repair"],
        "avg_rating_given": 4.6,
        "location": "Greater Noida",
        "booking_frequency": "monthly"
    }
    
    print(f"👤 User: {user_id}")
    print(f"📊 History: {json.dumps(user_history, indent=2)}")
    
    # Mock recommendation logic
    all_services = [
        {"name": "House Cleaning", "base_price": 1200, "popularity": 0.9},
        {"name": "Electrical Services", "base_price": 2300, "popularity": 0.7},
        {"name": "HVAC Services", "base_price": 2500, "popularity": 0.6},
        {"name": "Security System", "base_price": 2950, "popularity": 0.5},
        {"name": "Interior Painting", "base_price": 3200, "popularity": 0.4}
    ]
    
    recommendations = []
    for i, service in enumerate(all_services[:3]):
        confidence = 0.95 - (i * 0.15)
        reason = [
            "Based on your previous bookings and satisfaction",
            "Popular service in Greater Noida with high ratings",
            "Complements your existing service usage pattern"
        ][i]
        
        recommendations.append({
            "service_name": service["name"],
            "confidence_score": round(confidence, 2),
            "reason": reason,
            "estimated_price": service["base_price"],
            "estimated_duration": random.randint(60, 240)
        })
    
    print(f"🤖 AI Recommendations:")
    for rec in recommendations:
        print(f"  ✨ {rec['service_name']} (₹{rec['estimated_price']}) - {int(rec['confidence_score']*100)}% match")
        print(f"     💡 {rec['reason']}")

def demo_provider_matching():
    """Demo: Find best providers for a service"""
    print("\n⚡ SMART PROVIDER MATCHING")
    print("=" * 50)
    
    service_request = {
        "service_type": "Plumbing Repair",
        "location": "Greater Noida",
        "urgency": "normal",
        "customer_budget": 2500
    }
    
    print(f"🔧 Service Request: {json.dumps(service_request, indent=2)}")
    
    # Mock provider matching
    available_providers = [
        {
            "provider_id": "prov_001",
            "name": "Rajesh Kumar",
            "rating": 4.9,
            "experience_years": 8,
            "distance_km": 2.3,
            "price_estimate": 2000,
            "specialties": ["Plumbing", "Pipe Installation"]
        },
        {
            "provider_id": "prov_002", 
            "name": "Amit Singh",
            "rating": 4.7,
            "experience_years": 12,
            "distance_km": 4.1,
            "price_estimate": 2200,
            "specialties": ["Emergency Plumbing", "Leak Detection"]
        },
        {
            "provider_id": "prov_003",
            "name": "Vikram Yadav", 
            "rating": 4.6,
            "experience_years": 5,
            "distance_km": 1.8,
            "price_estimate": 1950,
            "specialties": ["Basic Plumbing", "Fixture Installation"]
        }
    ]
    
    # Calculate match scores
    for provider in available_providers:
        # Multi-factor scoring
        rating_score = provider["rating"] / 5.0
        distance_score = max(0.1, 1.0 - (provider["distance_km"] / 10.0))
        price_score = max(0.1, 1.0 - abs(provider["price_estimate"] - service_request["customer_budget"]) / 1000)
        experience_score = min(1.0, provider["experience_years"] / 10.0)
        
        match_score = (rating_score * 0.3 + distance_score * 0.3 + 
                      price_score * 0.2 + experience_score * 0.2)
        
        provider["match_score"] = round(match_score, 2)
        provider["estimated_arrival"] = f"{int(provider['distance_km'] * 15)}-{int(provider['distance_km'] * 20)} mins"
    
    # Sort by match score
    best_matches = sorted(available_providers, key=lambda x: x["match_score"], reverse=True)
    
    print(f"🤖 Best Provider Matches:")
    for i, provider in enumerate(best_matches, 1):
        print(f"  {i}. {provider['name']} - {int(provider['match_score']*100)}% match")
        print(f"     ⭐ {provider['rating']}/5 | 🚗 {provider['distance_km']}km away | ₹{provider['price_estimate']}")
        print(f"     🕒 ETA: {provider['estimated_arrival']} | 🔧 {', '.join(provider['specialties'])}")

def demo_demand_forecasting():
    """Demo: Predict service demand"""
    print("\n📈 DEMAND FORECASTING")
    print("=" * 50)
    
    forecast_request = {
        "service_type": "House Cleaning",
        "location": "Greater Noida",
        "days_ahead": 7
    }
    
    print(f"📊 Forecast Request: {json.dumps(forecast_request, indent=2)}")
    
    # Mock demand prediction
    base_demand = 15  # House Cleaning average daily demand
    predictions = []
    
    for i in range(forecast_request["days_ahead"]):
        date = datetime.now() + timedelta(days=i+1)
        day_of_week = date.weekday()
        
        # Weekend surge
        daily_demand = base_demand * (1.4 if day_of_week >= 5 else 1.0)
        
        # Add realistic variation
        random.seed(int(date.timestamp()))
        variation = random.uniform(0.8, 1.3)
        daily_demand = max(1, int(daily_demand * variation))
        
        confidence = max(0.6, 0.95 - (i * 0.05))  # Confidence decreases over time
        
        predictions.append({
            "date": date.strftime("%Y-%m-%d"),
            "day": date.strftime("%A"),
            "predicted_demand": daily_demand,
            "confidence": round(confidence, 2)
        })
    
    print(f"🤖 Demand Forecast:")
    for pred in predictions:
        confidence_bar = "█" * int(pred["confidence"] * 10)
        print(f"  📅 {pred['date']} ({pred['day'][:3]}): {pred['predicted_demand']} bookings expected")
        print(f"     📊 Confidence: {confidence_bar} {int(pred['confidence']*100)}%")

def main():
    """Run all AI/ML demonstrations"""
    print("🤖 HYPHOMZ AI/ML BACKEND DEMONSTRATION")
    print("🏠 Intelligent Home Services Platform")
    print("📍 Head Office: Greater Noida, Uttar Pradesh, India")
    print("=" * 60)
    
    # Run all demos
    demo_service_duration_prediction()
    demo_customer_churn_prediction()
    demo_service_recommendations()
    demo_provider_matching()
    demo_demand_forecasting()
    
    print("\n" + "=" * 60)
    print("✅ AI/ML Demo Complete!")
    print("💡 These features will make Hyphomz:")
    print("   • 🎯 More intelligent in service recommendations")
    print("   • ⚡ Faster in provider matching")
    print("   • 📊 Better at predicting customer needs")
    print("   • 💰 More profitable through optimization")
    print("   • 😊 Higher customer satisfaction")
    print("\n🚀 Ready to revolutionize home services with AI!")

if __name__ == "__main__":
    main() 