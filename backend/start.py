#!/usr/bin/env python3
"""
Hyphomz ML Backend Startup Script
Run this to start the AI/ML service for Hyphomz
"""

import uvicorn
import os

if __name__ == "__main__":
    # Run the FastAPI application
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    ) 