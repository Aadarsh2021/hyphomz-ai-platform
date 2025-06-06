#!/usr/bin/env python3
"""
Railway deployment entry point for Hyphomz AI Backend
"""
import os
import sys
sys.path.append('/app/backend')

from backend.main import app

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port) 