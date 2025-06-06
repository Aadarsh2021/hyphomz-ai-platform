from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # App configuration
    app_name: str = "Hyphomz AI/ML Backend"
    version: str = "1.0.0"
    debug: bool = True
    
    # Database
    database_url: str = "sqlite:///./hyphomz_ml.db"
    
    # Redis for caching
    redis_url: str = "redis://localhost:6379"
    
    # ML Model settings
    model_storage_path: str = "./models"
    retrain_interval_hours: int = 24
    
    # API settings
    api_v1_prefix: str = "/api/v1"
    
    # CORS settings
    allowed_origins: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://hyphomz.vercel.app"
    ]
    
    # Logging
    log_level: str = "INFO"
    
    # Feature flags
    enable_recommendations: bool = True
    enable_predictions: bool = True
    enable_analytics: bool = True
    enable_provider_matching: bool = True
    
    # ML specific settings
    recommendation_model_threshold: float = 0.7
    prediction_confidence_threshold: float = 0.8
    max_recommendations: int = 5
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Create settings instance
settings = Settings() 