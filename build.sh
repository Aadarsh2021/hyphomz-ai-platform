#!/usr/bin/env bash
# Render build script for Hyphomz AI Backend

set -o errexit  # exit on error

echo "🚀 Installing Python dependencies..."
pip install --upgrade pip
pip install -r backend/requirements.txt

echo "✅ Build completed successfully!" 