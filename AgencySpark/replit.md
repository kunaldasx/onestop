# NexaTech - Software Development Agency Landing Page

## Overview

This is a modern, premium software development agency landing page built to showcase services, case studies, and generate leads. The application features a sleek, animated single-page design inspired by modern tech companies like Vercel, Linear, and Stripe. The site presents NexaTech's services including web development, mobile apps, cloud solutions, SEO, and lead generation with an emphasis on visual appeal and user engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack:**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server with HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing
- **TanStack Query (React Query)** for server state management and API data fetching

**UI Component System:**
- **shadcn/ui** components built on Radix UI primitives for accessible, customizable UI elements
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Framer Motion** for sophisticated animations and transitions throughout the landing page
- **CVA (Class Variance Authority)** for component variant management

**Design System:**
- Custom typography using Inter (body) and Space Grotesk (headings) from Google Fonts
- Theme system supporting dark/light modes via context provider
- Consistent spacing units (4, 6, 8, 12, 16, 20, 24) using Tailwind's spacing scale
- Custom color palette with HSL-based theme variables for flexible theming

**Page Structure:**
The landing page follows a single-page architecture with smooth scroll navigation between sections:
- Hero section with full-width imagery and gradient overlays
- Services grid (6 cards in responsive grid)
- Case studies showcase (bento-style asymmetric layout)
- Tech stack carousel (infinite scrolling logos)
- Process timeline (4-step horizontal/vertical responsive)
- Testimonials section
- Stats bar with animated counters
- Contact form with validation
- CTA section and footer

### Backend Architecture

**Server Framework:**
- **Express.js** running on Node.js for the HTTP server
- RESTful API design pattern for contact form submissions
- Custom logging middleware for request/response tracking

**API Endpoints:**
- `POST /api/contact` - Submit contact form (with Zod validation)
- `GET /api/contact` - Retrieve contact submissions

**Data Validation:**
- **Zod** schemas for runtime type validation
- **zod-validation-error** for user-friendly error messages
- Schema definitions shared between client and server via `/shared` directory

**Storage Layer:**
- In-memory storage implementation (`MemStorage` class) for development
- Interface-based design (`IStorage`) allowing easy swap to database implementation
- Drizzle ORM configured for PostgreSQL migrations and schema management

**Development vs Production:**
- Development: Vite dev server with middleware mode for HMR
- Production: Static file serving from `dist/public` directory
- Build process uses esbuild for server bundling and Vite for client bundling

**Rationale:** The in-memory storage allows rapid development and testing without database setup. The interface pattern ensures production can easily switch to PostgreSQL using the already-configured Drizzle ORM without changing business logic.

### Database Schema (Configured, Not Implemented)

**ORM and Dialect:**
- **Drizzle ORM** configured for PostgreSQL
- Schema definitions in TypeScript using Drizzle's table builders
- Type-safe queries and migrations

**Tables:**

1. **users** table:
   - `id`: UUID primary key
   - `username`: Unique text field
   - `password`: Text field (for future authentication)

2. **contact_submissions** table:
   - `id`: UUID primary key
   - `name`: Required text field
   - `email`: Required text field
   - `company`: Optional text field
   - `message`: Required text field
   - `createdAt`: Timestamp with default now()

**Migration Strategy:**
- Migrations directory configured at `./migrations`
- Schema defined in `./shared/schema.ts` for sharing between frontend/backend
- `npm run db:push` script for pushing schema changes

**Rationale:** The database schema is defined and ready but uses in-memory storage in current implementation. This allows the application to run immediately without database provisioning while maintaining production-ready schema definitions.

## External Dependencies

### UI Component Libraries
- **@radix-ui/react-*** - Comprehensive set of unstyled, accessible UI primitives (accordion, dialog, dropdown, select, etc.)
- **shadcn/ui** - Pre-built component library using Radix UI with Tailwind styling
- **framer-motion** - Animation library for complex UI animations and transitions
- **embla-carousel-react** - Carousel/slider component for tech stack showcase

### Styling and Theming
- **Tailwind CSS** - Utility-first CSS framework with PostCSS processing
- **class-variance-authority** - Type-safe component variant API
- **clsx** & **tailwind-merge** - Utility for conditional className construction

### Form Management
- **react-hook-form** - Performant form state management with validation
- **@hookform/resolvers** - Validation resolver adapters for Zod integration

### Icons
- **lucide-react** - Icon library for UI elements
- **react-icons** - Additional icon sets (specifically Simple Icons for tech logos)

### Data Fetching and State
- **@tanstack/react-query** - Async state management for server data
- **axios** - HTTP client (available but not actively used; fetch API preferred)

### Database and ORM
- **drizzle-orm** - TypeScript ORM for SQL databases
- **drizzle-zod** - Zod schema generation from Drizzle tables
- **@neondatabase/serverless** - Neon PostgreSQL serverless driver
- **connect-pg-simple** - PostgreSQL session store for Express

### Validation
- **zod** - TypeScript-first schema validation
- **zod-validation-error** - Human-readable Zod error formatting

### Date Handling
- **date-fns** - Modern date utility library

### Development Tools
- **@replit/vite-plugin-*** - Replit-specific Vite plugins for development environment
- **tsx** - TypeScript execution for build scripts and dev server
- **esbuild** - Fast JavaScript bundler for production builds

### Asset Management
- Static assets stored in `attached_assets/generated_images/` directory
- Images referenced via Vite alias `@assets` for type-safe imports

**Rationale:** The tech stack prioritizes developer experience with TypeScript throughout, modern React patterns, and a component-first architecture. Radix UI provides accessibility out of the box, while Tailwind enables rapid styling. The separation of UI library (Radix) from styling (Tailwind) allows for flexible customization while maintaining accessibility standards.