# Pavo - Flaunt Your Academic Feathers

Pavo is the future of our education system, a comprehensive educational counsellor platform designed to help the youth of our country navigate their academic and career paths.

> Pavo is currently live! You can visit the site at: [https://pavo-flaunt-your-academic-feathers.vercel.app/](https://pavo-flaunt-your-academic-feathers.vercel.app/)

## Overview

Originally built as a small project for a college hackathon, Pavo has evolved into a full-fledged N-tier application. It helps students find scholarships, discover colleges, plan their career roadmaps, and predict admission chances. 

## Features

- **College Directory**: Explore universities, their courses, tuition fees, and admission criteria.
- **Scholarship Finder**: Find scholarships tailored to various academic levels and backgrounds.
- **Career Paths**: Detailed roadmaps, salary expectations, and required skills for different professions.
- **Admission Predictor**: Estimate chances of admission based on academic profiles.
- **Mentorship & Community**: Connect with peers and mentors.
- **Interactive Quizzes & Chatbot**: Get guided help and assess your skills.

## Tech Stack

The project features a decoupled architecture with a modern frontend and a robust backend:

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Radix UI components, Framer Motion
- **Other Tools**: React Hook Form, Recharts, Embla Carousel

### Backend
- **Framework**: [Spring Boot 4](https://spring.io/projects/spring-boot)
- **Language**: Java 17
- **Architecture**: N-Tier (Controllers, Managers, DAOs, Entities) backed by a mock DataStore
- **API**: RESTful JSON endpoints
- **Deployment**: Docker support included

## Getting Started

To run Pavo locally, you will need to start both the Spring Boot backend and the Next.js frontend.

### Prerequisites
- Node.js (v18+ recommended)
- Java 17
- Maven
- Docker (optional, for backend deployment)

### 1. Running the Backend (Spring Boot)

Navigate to the backend directory and run the application using Maven:
```bash
cd backend
mvn spring-boot:run
```
*(Alternatively, you can build and run the Docker image using the provided `Dockerfile`)*

### 2. Running the Frontend (Next.js)

Open a new terminal, navigate to the project root, install dependencies, and start the development server:
```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The frontend will communicate with the Spring Boot backend APIs.

## Project Structure

```text
Pavo-Flaunt-Your-Academic-Feathers/
├── app/                  # Next.js frontend pages and routing
├── components/           # Reusable React/Radix UI components
├── lib/                  # Frontend utilities
├── public/               # Static assets
└── backend/              # Spring Boot backend application
    ├── src/main/java/... # Java source code (Entities, DAOs, Controllers)
    ├── pom.xml           # Maven dependencies
    └── Dockerfile        # Backend containerization
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
