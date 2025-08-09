# Perfect Circle - Full-Stack Web Application

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue)](https://www.docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)](https://tailwindcss.com/)

Perfect Circle is a modern, full-stack web application built with Next.js, featuring a multilingual business website with an admin panel for content management. The application supports Arabic and English languages and includes features like project showcases, services, blog posts, team management, and contact forms.

> **Note**: This application uses `docker-compose.yml` (production configuration) by default. For development with hot reloading, use `docker-compose.dev.yml` explicitly.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Perfect Circle                       │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Next.js 15 with App Router)                     │
│  ├─ Public Website (Multilingual: AR/EN)                   │
│  ├─ Admin Panel (Authenticated)                            │
│  └─ API Routes (RESTful)                                   │
├─────────────────────────────────────────────────────────────┤
│  Authentication & Authorization (NextAuth.js)              │
├─────────────────────────────────────────────────────────────┤
│  Database Layer (PostgreSQL with Connection Pool)          │
├─────────────────────────────────────────────────────────────┤
│  Infrastructure (Docker + Nginx + SSL)                     │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
PerfectCircle/
├── 📁 src/                          # Source code
│   ├── 📁 app/                      # Next.js App Router
│   │   ├── 📁 [locale]/            # Internationalized routes
│   │   │   ├── about/              # About page
│   │   │   ├── blog/               # Blog pages
│   │   │   ├── contact/            # Contact page
│   │   │   ├── projects/           # Projects showcase
│   │   │   ├── services/           # Services pages
│   │   │   ├── layout.tsx          # Locale-specific layout
│   │   │   └── page.tsx            # Homepage
│   │   ├── 📁 admin/               # Admin panel (Protected)
│   │   │   ├── blog/               # Blog management
│   │   │   ├── categories/         # Category management
│   │   │   ├── projects/           # Project management
│   │   │   ├── services/           # Service management
│   │   │   ├── team/               # Team management
│   │   │   ├── login/              # Admin login
│   │   │   └── layout.tsx          # Admin layout
│   │   ├── 📁 api/                 # API Routes
│   │   │   ├── auth/               # Authentication
│   │   │   ├── blogs/              # Blog CRUD operations
│   │   │   ├── categories/         # Category management
│   │   │   ├── contact/            # Contact form
│   │   │   ├── projects/           # Project CRUD operations
│   │   │   ├── services/           # Service CRUD operations
│   │   │   ├── team/               # Team CRUD operations
│   │   │   ├── upload/             # File upload
│   │   │   └── test-email/         # Email testing
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   └── globals.css             # Global styles
│   ├── 📁 components/              # Reusable UI components
│   │   ├── Header.tsx              # Navigation header
│   │   ├── Footer.tsx              # Site footer
│   │   ├── HeroSection.tsx         # Homepage hero
│   │   ├── AboutSection.tsx        # About section
│   │   ├── ServicesSection.tsx     # Services showcase
│   │   ├── ProjectsSection.tsx     # Projects showcase
│   │   ├── BlogSection.tsx         # Blog section
│   │   ├── TeamSection.tsx         # Team showcase
│   │   ├── Consultation.tsx        # Consultation CTA
│   │   ├── LanguageSwitcher.tsx    # Language toggle
│   │   └── [Other Components]
│   ├── 📁 lib/                     # Utilities and configurations
│   │   ├── 📁 models/              # Data models
│   │   │   ├── blog.ts             # Blog operations
│   │   │   ├── category.ts         # Category operations
│   │   │   ├── project.ts          # Project operations
│   │   │   ├── service.ts          # Service operations
│   │   │   └── team.ts             # Team operations
│   │   ├── auth.ts                 # NextAuth configuration
│   │   ├── db.ts                   # Database connection
│   │   └── upload.ts               # File upload utilities
│   ├── 📁 i18n/                    # Internationalization
│   │   ├── navigation.ts           # Localized navigation
│   │   ├── request.ts              # Request handling
│   │   └── routing.ts              # Route configuration
│   ├── 📁 types/                   # TypeScript definitions
│   │   └── next-auth.d.ts          # NextAuth types
│   └── middleware.ts               # Next.js middleware
├── 📁 messages/                     # Translation files
│   ├── ar.json                     # Arabic translations
│   └── en.json                     # English translations
├── 📁 public/                      # Static assets
│   ├── 📁 companies/               # Company logos
│   ├── 📁 flags/                   # Language flags
│   └── 📁 uploads/                 # User uploads
├── 📁 nginx/                       # Nginx configuration
│   ├── nginx.conf                  # Main configuration
│   ├── ssl-nginx.conf              # SSL configuration
│   └── 📁 ssl/                     # SSL certificates
├── 📁 scripts/                     # Utility scripts
│   ├── setup-db.js                 # Database setup
│   └── setup-ssl.sh                # SSL setup
├── 📁 backup-certificates/         # Certificate backups
├── docker-compose.yml              # Production setup
├── docker-compose.dev.yml          # Development setup
├── Dockerfile                      # Container definition
├── schema.sql                      # Database schema
├── seed.sql                        # Initial data
├── .env                           # Environment variables
└── README.md                      # This file
```

## 🔧 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Next-Intl** - Internationalization (Arabic/English)

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication and session management
- **PostgreSQL** - Primary database
- **Node.js pg** - PostgreSQL client
- **bcryptjs** - Password hashing

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancer
- **SSL/TLS** - Security certificates

### External Services
- **Cloudinary** - Image upload and management
- **Nodemailer/Resend** - Email services
- **Namecheap Private Email** - Email hosting

## 🌐 Application Flow

### 1. Frontend Architecture

The application uses Next.js 15 with the App Router, providing:

#### **Public Routes** (Multilingual)
```
/[locale]/          # Homepage (AR/EN)
/[locale]/about     # About page
/[locale]/services  # Services listing
/[locale]/services/[slug]  # Individual service
/[locale]/projects  # Projects showcase
/[locale]/projects/[slug]  # Individual project
/[locale]/blog      # Blog listing
/[locale]/blog/[slug]     # Individual blog post
/[locale]/contact   # Contact form
```

#### **Admin Routes** (Protected)
```
/admin/login        # Admin authentication
/admin/             # Dashboard
/admin/services     # Service management
/admin/projects     # Project management
/admin/blog         # Blog management
/admin/team         # Team management
/admin/categories   # Category management
```

### 2. API Architecture

RESTful API endpoints following standard conventions:

#### **Content Management APIs**
```
GET    /api/services           # List all services
POST   /api/services           # Create service (Admin)
GET    /api/services/[id]      # Get specific service
PUT    /api/services/[id]      # Update service (Admin)

GET    /api/projects           # List all projects
POST   /api/projects           # Create project (Admin)
GET    /api/projects/[id]      # Get specific project
PUT    /api/projects/[id]      # Update project (Admin)

GET    /api/blogs              # List all blog posts
POST   /api/blogs              # Create blog post (Admin)
GET    /api/blogs/[id]         # Get specific blog post
PUT    /api/blogs/[id]         # Update blog post (Admin)

GET    /api/team               # List team members
POST   /api/team               # Add team member (Admin)
GET    /api/team/[id]          # Get specific team member
PUT    /api/team/[id]          # Update team member (Admin)

GET    /api/categories         # List categories
POST   /api/categories         # Create category (Admin)
```

#### **Utility APIs**
```
POST   /api/upload             # File upload to Cloudinary
POST   /api/contact            # Contact form submission
GET    /api/test-email         # Email testing
POST   /api/auth/[...nextauth] # Authentication
```

### 3. Database Schema

The PostgreSQL database includes the following main tables:

#### **Core Tables**
```sql
users              # Admin authentication
├─ id (UUID)
├─ name, email, password
├─ role (admin/user)
└─ timestamps

categories         # Project categories
├─ id (UUID)
├─ name (JSONB - multilingual)
├─ slug
└─ timestamps

services           # Service offerings
├─ id (UUID)
├─ title (JSONB - multilingual)
├─ slug
├─ short_description (JSONB)
├─ description (JSONB)
├─ icon
└─ timestamps

projects           # Portfolio projects
├─ id (UUID)
├─ title (JSONB - multilingual)
├─ slug
├─ description (JSONB)
├─ category_id (FK)
├─ image_url
├─ technologies (JSONB)
├─ is_published
└─ timestamps

blog_posts         # Blog articles
├─ id (UUID)
├─ title, slug
├─ content, excerpt
├─ image_url
├─ is_published
└─ timestamps

team_members       # Team showcase
├─ id (UUID)
├─ name, position
├─ image
├─ social_links (JSONB)
└─ timestamps
```

### 4. Authentication Flow

```mermaid
graph TD
    A[User Access Admin] --> B[Middleware Check]
    B --> C{Is Authenticated?}
    C -->|No| D[Redirect to Login]
    C -->|Yes| E{Is Admin Role?}
    E -->|No| D
    E -->|Yes| F[Access Admin Panel]
    D --> G[Login Form]
    G --> H[NextAuth.js]
    H --> I[Database Verification]
    I --> J{Valid Credentials?}
    J -->|No| K[Login Failed]
    J -->|Yes| L[Create JWT Session]
    L --> F
```

### 5. Internationalization Flow

```mermaid
graph TD
    A[User Visits Site] --> B[Middleware Detects Locale]
    B --> C{Locale in URL?}
    C -->|No| D[Redirect to Default Locale 'ar']
    C -->|Yes| E[Load Locale Messages]
    E --> F[Render Page with Translations]
    F --> G[Language Switcher Available]
    G --> H[Switch Language]
    H --> I[Navigate to New Locale URL]
    I --> E
```

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)
- PostgreSQL 15+ (if running locally)

### 1. Environment Setup

The `.env` file is already configured with:
```bash
# Database
DATABASE_URL=postgresql://perfectcircle_user:***@localhost:5432/perfectcircle
DOCKER_DATABASE_URL=postgresql://perfectcircle_user:***@db:5432/perfectcircle

# Authentication
NEXTAUTH_SECRET=***
NEXTAUTH_URL=https://perfectloop.tech

# Email (Namecheap Private Email)
SMTP_HOST=mail.privateemail.com
SMTP_PORT=587
SMTP_USER=info@perfectloop.tech
SMTP_PASSWORD=***
```

### 2. Quick Start (Recommended)

```bash
# Start the application
docker-compose up --build

# Or run in background
docker-compose up --build -d

# View logs
docker-compose logs -f

# Access application: http://localhost
```

### 3. Development Mode (Optional)

```bash
# Start with hot reloading (development only)
docker-compose -f docker-compose.dev.yml up --build

# Or run in background
docker-compose -f docker-compose.dev.yml up --build -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Access application: http://localhost:3000
```

### 4. Database Operations

```bash
# Access database
docker-compose exec db psql -U perfectcircle_user -d perfectcircle

# Run database setup
docker-compose exec app npm run setup-db

# Reset database (removes all data!)
docker-compose down -v
docker-compose up --build
```

## 🛠️ Development Workflow

### Adding New Content

1. **Services**: Use admin panel at `/admin/services`
2. **Projects**: Use admin panel at `/admin/projects`
3. **Blog Posts**: Use admin panel at `/admin/blog`
4. **Team Members**: Use admin panel at `/admin/team`

### Adding New Translations

1. Edit `messages/ar.json` for Arabic
2. Edit `messages/en.json` for English
3. Use translations in components: `const t = useTranslations('namespace')`

### Database Modifications

1. Update `schema.sql` for structure changes
2. Update model files in `src/lib/models/`
3. Rebuild containers: `docker-compose up --build`

## 🔐 Security Features

- **Authentication**: JWT-based sessions with NextAuth.js
- **Authorization**: Role-based access control (Admin only)
- **CSRF Protection**: Built into Next.js
- **Rate Limiting**: Configured in Nginx
- **SSL/TLS**: Automated certificate management
- **Input Validation**: Server-side validation for all APIs
- **Password Hashing**: bcryptjs with salted hashes

## 📧 Email Configuration

The application uses Namecheap Private Email for:
- Contact form submissions
- Admin notifications
- System alerts

Email testing endpoint: `/api/test-email`

## 🌍 Multilingual Support

### Supported Languages
- **Arabic (ar)** - Default language, RTL support
- **English (en)** - LTR support

### Features
- Automatic language detection
- URL-based locale routing (`/ar/about`, `/en/about`)
- Language switcher component
- RTL/LTR layout support
- Localized fonts (Cairo/Tajawal for Arabic, Inter for English)

## 🖼️ File Upload System

- **Service**: Cloudinary integration
- **Endpoint**: `/api/upload`
- **Features**: 
  - Automatic image optimization
  - Multiple format support
  - Cloud storage with CDN
  - Secure upload with validation

## 📊 Monitoring and Logging

- **Application Logs**: Structured logging with timestamps
- **Database Queries**: Query performance logging
- **Health Checks**: Built-in container health monitoring
- **Error Tracking**: Comprehensive error handling

## 🚀 Deployment

### Quick Deployment

The application uses the production-ready `docker-compose.yml` by default:

```bash
# Deploy the application
docker-compose up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Production Deployment Options

1. **VPS Deployment**: See `VPS_DEPLOYMENT_GUIDE.md`
2. **Cloud Platforms**: Railway, DigitalOcean, AWS, GCP
3. **Container Registry**: Docker Hub, AWS ECR, etc.

### SSL Configuration

```bash
# Setup SSL automatically
./scripts/setup-ssl.sh yourdomain.com your@email.com

# Switch to SSL configuration
cp nginx/ssl-nginx.conf nginx/nginx.conf
docker-compose restart nginx
```

## 🧪 Testing

```bash
# Test email functionality
curl http://localhost/api/test-email

# Health checks
docker-compose ps
docker-compose exec nginx nginx -t
```

## 📚 API Documentation

### Authentication Required Endpoints

All admin endpoints require authentication:
- Header: `Authorization: Bearer <jwt_token>`
- Session: Valid NextAuth.js session
- Role: `admin`

### Error Responses

All APIs return consistent error formats:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional details"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code structure
4. Add proper TypeScript types
5. Test with Docker containers
6. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues and questions:
1. Check the logs: `docker-compose logs -f`
2. Review the troubleshooting guides
3. Contact the development team

---

**Perfect Circle** - Modern, Multilingual, Full-Stack Web Application 🎯
