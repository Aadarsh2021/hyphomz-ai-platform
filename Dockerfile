# Simple single-stage Dockerfile for Railway
FROM node:18

WORKDIR /app

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Install Python dependencies
RUN pip3 install -r backend/requirements.txt

# Build frontend
ENV NEXT_PUBLIC_AI_API_URL=http://localhost:8000
RUN npm run build

# Expose port
EXPOSE 3000

# Start both services
CMD ["sh", "-c", "cd backend && python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 & npm start"] 