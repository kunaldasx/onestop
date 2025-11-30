# Design Guidelines: Software Development Agency Landing Page

## Design Approach
**Reference-Based** drawing from modern tech companies: Vercel's technical elegance, Linear's minimalist sophistication, and Stripe's polished professionalism. This agency showcases their expertise through the website itself—every interaction demonstrates their capabilities.

## Typography System
- **Primary Font**: Inter (Google Fonts) - clean, technical, highly legible
- **Accent Font**: Space Grotesk (Google Fonts) - distinctive, modern for headlines
- **Hierarchy**:
  - Hero headline: text-6xl/text-7xl, font-bold, Space Grotesk
  - Section headlines: text-4xl/text-5xl, font-bold, Space Grotesk
  - Body: text-base/text-lg, Inter, leading-relaxed
  - Small text: text-sm, text-opacity-70

## Layout System
**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 (e.g., p-8, gap-12, mt-20)

**Section Structure**:
- Hero: 90vh with full-width dramatic image
- Content sections: py-20 desktop, py-12 mobile
- Max-width containers: max-w-7xl for full sections, max-w-6xl for content
- Grid system: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Page Structure & Components

**1. Navigation**
Sticky header with blur backdrop, logo left, menu items center, CTA button right. Include subtle border-b on scroll.

**2. Hero Section**
Full-width dramatic code/technology workspace image with gradient overlay (dark bottom). Headline + subheadline + dual CTA buttons (primary + secondary with blurred backgrounds). Small trust indicators below ("Trusted by 50+ companies").

**3. Services Grid**
6 service cards in 2x3 grid (mobile: 1 column). Each card: icon (Heroicons), title, 2-sentence description, hover lift effect. Services: Web Development, Mobile Apps, Cloud Solutions, SEO & Marketing, Lead Generation, Ongoing Maintenance.

**4. Case Studies Showcase**
3 featured projects in bento-style asymmetric grid. Large card left (2/3 width), two stacked cards right (1/3 width each). Each includes: project image, client logo, title, results metrics, tech stack tags.

**5. Tech Stack Section**
Infinite scrolling logo carousel of technologies: React, Next.js, TypeScript, Node.js, AWS, etc. Two rows scrolling opposite directions.

**6. Process Timeline**
4-step horizontal timeline (vertical on mobile): Discovery → Design → Development → Launch. Each step with number, title, description, connecting line animation.

**7. Social Proof**
3-column testimonial cards with client photo, quote, name, company, company logo. Subtle card borders.

**8. Stats Bar**
Full-width dark section, 4-column grid: Projects Completed, Years Experience, Team Members, Client Satisfaction. Large numbers with labels.

**9. CTA Section**
Centered content, bold headline "Ready to Build Something Amazing?", description, primary CTA, secondary contact link.

**10. Footer**
4-column layout: Logo/description, Quick Links, Services, Contact Info. Bottom bar with copyright and social icons.

## Animations (Framer Motion - Strategic)
- Hero: Staggered fade-in for headline/buttons (0.2s delays)
- Service cards: Fade up on scroll (threshold: 0.2)
- Case studies: Scale on hover (scale: 1.02)
- Stats: Number count-up animation when in view
- Process timeline: Line draws left-to-right on scroll
- Logo carousel: Continuous smooth scroll

## Component Details
- **Buttons**: Rounded-lg, px-8 py-4, font-medium
- **Cards**: Rounded-2xl, border, p-8, hover:shadow-xl transition
- **Icons**: Heroicons (outline style), w-8 h-8 minimum
- **Forms** (contact): Floating labels, rounded-xl inputs, validation states

## Images
**Hero Image**: Atmospheric shot of modern workspace with code on screens, developer working, soft natural lighting. Should feel aspirational and technical.

**Case Study Images**: High-quality mockups of delivered projects (desktop/mobile views), clean product screenshots, or branded project imagery.

**Total Images Required**: 1 hero + 3 case studies = 4 images

## Responsive Behavior
- Breakpoints: md (768px), lg (1024px), xl (1280px)
- Mobile: Stack all grids to single column, reduce heading sizes by 1 step
- Tablet: 2-column grids, maintain visual hierarchy
- Navigation: Hamburger menu on mobile with slide-in drawer