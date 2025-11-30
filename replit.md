# NexaTech Agency Landing Page (Next.js 15)

## Overview
A modern, responsive agency landing page built with Next.js 15, TypeScript, and Tailwind CSS. Features dark/light mode, smooth animations with Framer Motion, and a complete blog system with admin capabilities.

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: TanStack React Query
- **Database**: Drizzle ORM with Neon PostgreSQL
- **Form Handling**: React Hook Form with Zod validation

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── blog/          # Blog CRUD endpoints
│   │   └── contact/       # Contact form endpoint
│   ├── blog/              # Blog pages
│   │   ├── [slug]/        # Dynamic blog post page
│   │   └── admin/         # Blog admin page
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── ui/                # shadcn/ui base components
│   ├── navigation.tsx     # Main navigation
│   ├── hero.tsx           # Hero section
│   ├── services.tsx       # Services section
│   ├── case-studies.tsx   # Portfolio showcase
│   ├── process.tsx        # Work process section
│   ├── testimonials.tsx   # Client testimonials
│   ├── pricing-calculator.tsx # Dynamic pricing
│   ├── contact.tsx        # Contact form
│   ├── footer.tsx         # Site footer
│   └── providers.tsx      # App providers wrapper
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Data access layer
│   ├── queryClient.ts     # React Query client
│   └── utils.ts           # Helper utilities
└── styles/
    └── globals.css        # Global styles
```

### Key Features
1. **Responsive Design**: Mobile-first approach with tailored layouts
2. **Theme System**: Dark/light mode with CSS variables
3. **Smooth Animations**: Page transitions and scroll animations
4. **Blog System**: Full CRUD with markdown-like formatting
5. **Contact Form**: Validated form with database storage
6. **Pricing Calculator**: Dynamic cost estimation tool

## Development

### Running Locally
The project runs on port 5000 with `npm run dev`.

### API Routes
- `GET /api/blog` - Fetch all published blog posts
- `GET /api/blog?all=true` - Fetch all blog posts (including drafts)
- `POST /api/blog` - Create new blog post
- `GET /api/blog/[slug]` - Fetch single blog post by slug
- `PATCH /api/blog/[slug]` - Update blog post
- `DELETE /api/blog/[slug]` - Delete blog post
- `POST /api/contact` - Submit contact form

### Database Schema
Located in `shared/schema.ts`:
- `contactSubmissions` - Contact form entries
- `blogPosts` - Blog posts with slug, content, category

## Recent Changes
- Migrated from React/Vite/Express to Next.js 15 with App Router
- Converted all routing from Wouter to Next.js Link/useRouter
- Replaced Express.js API endpoints with Next.js API routes
- Updated all components with "use client" directives where needed
- Configured images to use Next.js Image optimization
