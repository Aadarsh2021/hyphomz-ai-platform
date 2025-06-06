# ✨ Hyphomz AI Platform

Complete AI-powered home services platform with Next.js 14 frontend and FastAPI ML backend, featuring cutting-edge design and intelligent user experiences.

## 🚀 Features

### 🎨 Premium Design System
- **Modern UI/UX** - Glass morphism effects and premium color schemes
- **Advanced Animations** - Extensive Framer Motion animations and micro-interactions
- **Interactive Elements** - Particle systems, parallax scrolling, and mouse-following effects
- **Responsive Design** - Mobile-first approach with optimized layouts for all devices

### 🤖 AI Integration
- **Smart Recommendations** - AI-powered service suggestions based on user preferences
- **AI Demo Page** - Interactive neural network visualizations and real-time processing
- **Enhanced Booking** - ML-powered provider matching and duration prediction
- **Real-time Analytics** - Live AI processing dashboards and performance metrics

### 🛠️ Core Functionality
- **Service Catalog** - Advanced filtering and search capabilities
- **Booking System** - 4-step booking flow with AI enhancements
- **User Authentication** - Login/signup with social auth and mock validation
- **Dark/Light Mode** - System preference detection with smooth transitions

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks

### Backend
- **Framework**: FastAPI
- **Language**: Python
- **Machine Learning**: scikit-learn, pandas, numpy
- **Database**: SQLite (development), PostgreSQL (production)
- **Documentation**: Swagger UI / ReDoc

### Deployment
- **Frontend**: Vercel-ready
- **Backend**: Docker, Uvicorn
- **Database**: PostgreSQL

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aadarsh2021/hyphomz-ai-platform.git
   cd hyphomz-ai-platform
   ```

## 📁 Organized Directory Structure

```
hyphomz-ai-platform/
├── 🎨 Frontend Files
│   ├── src/                      # Next.js source code
│   ├── public/                   # Static assets
│   ├── package.json              # Frontend dependencies
│   ├── next.config.js            # Next.js configuration
│   ├── tailwind.config.ts        # Tailwind CSS config
│   └── tsconfig.json             # TypeScript config
├── 🤖 Backend Integration  
│   └── backend/                  # FastAPI ML backend
│       ├── app/                  # Python application
│       ├── main.py              # Backend entry point
│       ├── requirements.txt      # Python dependencies
│       └── README.md            # Backend documentation
├── 🚀 Development Tools
│   ├── start-dev.sh             # Linux/macOS startup
│   ├── start-dev.bat            # Windows startup
│   └── CONFIGURATION.md         # Setup guide
├── 📚 Documentation
│   ├── README.md                # This file
│   └── README-AI-INTEGRATION.md # AI features guide
└── 🔧 Configuration
    ├── .gitignore               # Git ignore rules
    └── .git/                    # Git repository
```

### Quick Start (Recommended)

2. **One-click startup** (Linux/macOS)
   ```bash
   chmod +x start-dev.sh
   ./start-dev.sh
   ```

   **Windows users:**
   ```cmd
   start-dev.bat
   ```

3. **Or manually setup everything**
   ```bash
   npm run setup
   npm run dev:full
   ```

### Manual Setup

**Frontend Setup:**
2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Run the frontend development server**
   ```bash
   npm run dev
   ```

**Backend Setup:**
4. **Install backend dependencies**
   ```bash
   npm run backend:install
   # or manually:
   cd backend && pip install -r requirements.txt
   ```

5. **Run the backend server**
   ```bash
   npm run backend:dev
   # or manually:
   cd backend && python main.py
   ```

### Access the Application

6. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

## 🏗️ Project Structure

```
hyphomz-ai-platform/
├── 📁 Frontend (Next.js 14)
│   ├── src/
│   │   ├── app/                       # Next.js 14 App Router
│   │   │   ├── page.tsx              # Homepage with hero, services, AI features
│   │   │   ├── layout.tsx            # Root layout with providers
│   │   │   ├── globals.css           # Global styles and custom CSS
│   │   │   ├── about/                # About page
│   │   │   ├── ai-demo/              # AI demonstration page
│   │   │   ├── admin/                # Admin dashboard (future)
│   │   │   ├── login/                # Authentication pages
│   │   │   └── services/             # Service catalog and booking
│   │   ├── components/               # Reusable React components
│   │   │   ├── ui/                   # Shadcn/ui components (Button, Card, etc.)
│   │   │   ├── ai/                   # AI-specific components
│   │   │   ├── services/             # Service-related components
│   │   │   ├── Hero.tsx              # Hero section with animations
│   │   │   ├── Navbar.tsx            # Navigation with dark mode toggle
│   │   │   ├── Services.tsx          # Services grid and filtering
│   │   │   ├── ServiceCard.tsx       # Individual service card component
│   │   │   ├── HowItWorks.tsx        # Process explanation section
│   │   │   ├── Contact.tsx           # Contact form with validation
│   │   │   ├── Footer.tsx            # Footer with links and info
│   │   │   └── BookingSummaryModal.tsx # Enhanced booking modal (50KB)
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── lib/                      # Utility libraries and configurations
│   │   ├── utils/                    # Helper functions and utilities
│   │   └── context/                  # React context providers
│   ├── public/                       # Static assets
│   │   ├── images/                   # Image assets
│   │   ├── icons/                    # Icon files
│   │   └── *.svg                     # SVG icons and graphics
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   ├── next.config.js               # Next.js configuration
│   ├── package.json                 # Frontend dependencies and scripts
│   └── tsconfig.json                # TypeScript configuration
├── 📁 Backend (FastAPI + ML)
│   ├── app/                          # Main application package
│   │   ├── routers/                 # FastAPI route handlers
│   │   │   ├── analytics.py         # Analytics endpoints
│   │   │   ├── predictions.py       # ML prediction services (12KB)
│   │   │   ├── provider_matching.py # Provider matching algorithms
│   │   │   └── recommendations.py   # AI recommendation engine
│   │   ├── core/                    # Core application configuration
│   │   ├── models/                  # Database and ML models
│   │   ├── utils/                   # Utility functions and helpers
│   │   └── data/                    # Data processing and storage
│   ├── main.py                      # FastAPI application entry point (4.9KB)
│   ├── demo.py                      # Demo script with sample data (11KB)
│   ├── start.py                     # Application startup script
│   └── requirements.txt             # Python dependencies (45 packages)
└── README.md                        # Project documentation
```

## 🚀 Deployment

### Frontend (Vercel - Recommended)
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect repository to Vercel
   - Set build command: `npm run build`
   - Set environment variable: `NEXT_PUBLIC_AI_API_URL=https://your-backend-url.com`
   - Deploy automatically

### Backend (Railway/Heroku)
1. **Create Dockerfile in backend directory**
   ```dockerfile
   FROM python:3.11-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   EXPOSE 8000
   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

2. **Deploy to Railway/Heroku**
   - Connect your repository
   - Set environment variables for production
   - Deploy backend service

### Manual Deployment
```bash
# Frontend
npm run build
npm run start

# Backend
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Repository Structure

This is a **monorepo** containing both frontend and backend:
- **Frontend**: Next.js 14 application in the root directory
- **Backend**: FastAPI ML service in the `/backend` directory
- **Benefits**: Synchronized development, coordinated deployments, shared tooling

---

**Built with ❤️ and cutting-edge technology for the future of home services**
