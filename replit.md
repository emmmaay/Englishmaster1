# English Masters Examination System

## Overview

This is a web-based Computer-Based Testing (CBT) platform specifically designed for English Masters examinations. The application provides a timed examination interface where students can answer multiple-choice questions with automatic progression and result calculation. The system features a modern, responsive design with real-time timers, progress tracking, and comprehensive result analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development practices
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **State Management**: React hooks with custom exam state management hook (`useExam`)
- **Data Fetching**: TanStack Query for server state management and caching

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API with JSON responses
- **Storage**: In-memory storage with interface abstraction for future database integration
- **Development**: Hot module replacement and live reloading via Vite integration

### Application Structure
- **Monorepo Layout**: Client and server code in separate directories with shared schemas
- **Component Organization**: Modular UI components with clear separation of concerns
- **Page-based Routing**: Landing page, exam interface, and results display
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Data Storage Solutions
- **Current**: In-memory storage with predefined question bank
- **Future-Ready**: Database abstraction layer prepared for PostgreSQL integration via Drizzle ORM
- **Question Management**: Structured question bank with multiple-choice format
- **Session Handling**: Exam state management with timer tracking and answer persistence

### Core Features
- **Timed Examinations**: 20-second countdown per question with visual feedback
- **Question Navigation**: Forward/backward navigation with answer preservation
- **Progress Tracking**: Visual progress indicators and completion status
- **Result Analytics**: Comprehensive scoring with percentage calculations and performance metrics
- **Responsive Interface**: Cross-device compatibility with mobile optimization

### Authentication and Authorization
- **Current**: No authentication system implemented
- **Session Management**: Client-side exam session state without persistence
- **Future Considerations**: Ready for user authentication and session persistence integration

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives for consistent component behavior
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Drizzle ORM**: Type-safe ORM ready for PostgreSQL database integration
- **Neon Database**: Cloud PostgreSQL provider (configured but not actively used)
- **ESBuild**: Fast JavaScript bundler for production builds

### Runtime Dependencies
- **TanStack Query**: Server state management for efficient data fetching and caching
- **React Hook Form**: Form handling with validation support
- **Date-fns**: Date manipulation utilities for timer and result calculations
- **Zod**: Schema validation for type-safe data handling

### Development Infrastructure
- **Replit Integration**: Development environment optimizations and error handling
- **TypeScript**: Static type checking for improved code quality
- **Vite Plugins**: Development experience enhancements including error overlays and cartographer integration