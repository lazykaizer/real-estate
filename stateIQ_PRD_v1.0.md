# 🏠 EstateIQ — Product Requirements Document

**Version:** 1.0 &nbsp;|&nbsp; **Date:** March 2026 &nbsp;|&nbsp; **Status:** Draft → Review &nbsp;|&nbsp; **Confidential**

| Field | Detail |
|---|---|
| **Document Owner** | Product Team |
| **Last Updated** | March 4, 2026 |
| **Priority** | P0 — Strategic Initiative |
| **Reviewers** | Design, Engineering, Product, Legal |
| **Target Launch** | Q4 2026 |

---


## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [User Personas](#3-user-personas)
4. [Design System & Brand Identity](#4-design-system--brand-identity)
5. [Information Architecture & Sitemap](#5-information-architecture--sitemap)
6. [Feature Specifications](#6-feature-specifications)
7. [Technical Architecture](#7-technical-architecture)
8. [Detailed Page Requirements](#8-detailed-page-requirements)
9. [Mobile Application](#9-mobile-application)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Phased Delivery Roadmap](#11-phased-delivery-roadmap)
12. [Risks & Mitigation](#12-risks--mitigation)
13. [Team & Resourcing](#13-team--resourcing)
14. [Appendix](#14-appendix)

---

## 1. Executive Summary

> **Mission Statement:** EstateIQ is a full-featured real estate marketplace that connects buyers, sellers, renters, and agents in a seamless, data-driven experience — built with the trust of a bank and the speed of a startup.

The real estate market is one of the largest and most underserved digital verticals. Consumers expect a Zillow-grade search experience, Airbnb-quality design, and bank-grade trust signals — all in one cohesive platform.

EstateIQ delivers this by combining advanced property search, AI-powered recommendations, agent CRM tooling, mortgage pre-qualification, neighbourhood intelligence, and an immersive virtual tour experience into a single product.

### 1.1 Problem Statement

Existing platforms suffer from fragmented UX, outdated listings, poor mobile experiences, and no unified buyer-to-close journey. Agents lack proper digital tools, and buyers are forced to jump between multiple sites and apps to complete a single transaction.

### 1.2 Proposed Solution

A blue-green branded real estate platform that serves all four user archetypes — buyers, sellers, renters, and agents — with purpose-built flows, live data, and a trust-first design system.

---

## 2. Goals & Success Metrics

### 2.1 Business Goals

- Achieve **250,000 monthly active users** within 12 months of launch
- On-board **5,000+ verified real estate agents** in Year 1
- Generate **15,000+ qualified lead connections** per month by end of Year 1
- Establish brand recognition as a **top-5 real estate platform** in target markets
- Drive **$2M ARR** through premium agent subscriptions and featured listings

### 2.2 Product Goals

- Sub-2-second page load times on all critical pages (LCP < 2.5s)
- 95%+ listing accuracy and freshness (updated every 15 minutes from MLS feeds)
- WCAG 2.1 AA accessibility compliance across all pages
- >4.5 App Store / Play Store rating within 6 months
- Mobile-first: 60%+ of sessions to be on mobile devices

### 2.3 Key Performance Indicators (KPIs)

| Metric | Baseline | 6-Month Target | 12-Month Target |
|---|---|---|---|
| Monthly Active Users | 0 (launch) | 80,000 | 250,000 |
| Search-to-Lead CVR | — | 2.5% | 4% |
| Agent Subscriptions | 0 | 1,500 | 5,000 |
| Avg. Session Duration | — | > 4 min | > 6 min |
| Bounce Rate | — | < 45% | < 35% |
| NPS Score | — | > 40 | > 55 |

---

## 3. User Personas

### 🏡 Home Buyer
- **Demographics:** Age 28–50, professional, first-time or move-up buyer
- **Goals:** Find dream home, understand market value, connect with agent
- **Pain Points:** Stale listings, opaque pricing, overwhelming process
- **Key Features Needed:** Advanced search, price history, mortgage calculator, agent connect

### 🏘️ Home Seller
- **Demographics:** Age 35–65, homeowner, downsizing or relocating
- **Goals:** Maximize sale price, find qualified buyers, manage showings
- **Pain Points:** Low exposure, commission anxiety, long time on market
- **Key Features Needed:** Free valuation, listing tools, offer management, seller analytics

### 🔑 Renter
- **Demographics:** Age 22–35, urban professional, mobile lifestyle
- **Goals:** Quick search, verified listings, flexible leases
- **Pain Points:** Scam listings, hidden fees, slow application process
- **Key Features Needed:** Verified listings badge, instant apply, rent calculator

### 👔 Real Estate Agent
- **Demographics:** Licensed agent, 2–20 yrs experience, independent or brokerage
- **Goals:** Generate leads, manage listings, track clients
- **Pain Points:** Low-quality leads, poor CRM, no analytics dashboard
- **Key Features Needed:** Agent dashboard, CRM, lead inbox, analytics, listing management

---

## 4. Design System & Brand Identity

### 4.1 Brand Concept

EstateIQ's visual identity is built on a **Blue-Green palette** — blue signals trust, stability, and professionalism (banking and finance connotations); green signals growth, sustainability, and new beginnings (perfect for real estate). Together they create a distinctive, premium-feeling brand that stands out from competitors.

### 4.2 Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `navy` | `#0A2E5C` | Primary backgrounds, footer, dark headers |
| `blue` | `#1565C0` | CTAs, links, active states, property prices |
| `blue-light` | `#E3F0FF` | Section backgrounds, card hover states |
| `forest` | `#1B5E20` | Dark badges, verified headers |
| `green` | `#2E7D32` | Success states, tags, "Post Property" button |
| `green-light` | `#E8F5E9` | Feature highlights, selected states |
| `teal` | `#00695C` | Accent icons, borders, interactive elements |
| `teal-light` | `#E0F2F1` | Teal section backgrounds |
| `white` | `#FFFFFF` | Page backgrounds |
| `gray-dark` | `#212121` | Primary body text |
| `gray-mid` | `#5C5C5C` | Secondary text, labels |
| `gray-light` | `#F5F5F5` | Alternate row backgrounds |

### 4.3 Typography

| Role | Font Family | Weight | Size | Usage |
|---|---|---|---|---|
| Display / Hero | Playfair Display | 700 Bold | 48–72px | Hero headings only |
| Section Headings | Inter | 600 SemiBold | 28–40px | H1, H2 titles |
| Sub-headings | Inter | 500 Medium | 18–24px | H3, card titles |
| Body Copy | Inter | 400 Regular | 14–16px | Paragraphs, descriptions |
| Price / Data | Inter Tabular | 700 Bold | 20–32px | Listing prices, stats |
| Labels / Captions | Inter | 400 Regular | 11–13px | Form labels, captions |

### 4.4 Design Principles

1. **Trust First** — every UI element must communicate reliability; verified badges, SSL indicators, agent licenses
2. **Search-Centric** — the search experience is the hero; it appears above the fold on every entry point
3. **Mobile-First Responsive** — design starts at 375px and scales up; no desktop-first compromises
4. **Data-Rich but Scannable** — dense information presented through progressive disclosure
5. **Accessibility** — WCAG 2.1 AA minimum; colour contrast ratios ≥ 4.5:1 for normal text
6. **Delight through Motion** — subtle micro-animations on card hover, page transitions (Framer Motion)

### 4.5 Component Tokens

```css
/* Spacing */
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;

/* Shadows */
--shadow-card: 0 2px 12px rgba(10,46,92,0.08);
--shadow-card-hover: 0 8px 32px rgba(10,46,92,0.16);
--shadow-modal: 0 24px 64px rgba(10,46,92,0.24);

/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 350ms ease;
```

---

## 5. Information Architecture & Sitemap

### 5.1 Top-Level Navigation

| Nav Item | Sub-pages | Target Persona |
|---|---|---|
| **Buy** | Search Listings · Saved Homes · Mortgage Calculator · Pre-Approval · Recently Sold · Market Reports | Buyers |
| **Rent** | Rentals Search · Apply Online · Rental Calculator · Move-in Guides · Tenant Resources | Renters |
| **Sell** | Home Valuation · List Your Home · Seller Resources · Find an Agent · Pricing Strategy | Sellers |
| **Agents** | Find an Agent · Agent Profiles · Agent Signup · Agent Dashboard · CRM Tools | All |
| **Mortgage** | Calculator · Pre-Qualify · Lender Directory · Rate Tracker · Refinance Tools | Buyers / Owners |
| **Explore** | Neighbourhood Guides · Schools · Crime Maps · Walk Score · Local Amenities · Market Trends | All |
| **Blog / News** | Real Estate News · Buying Guides · Investment Tips · Market Forecasts | All |

### 5.2 URL Structure

```
/                          → Homepage
/buy                       → Buy search results
/rent                      → Rent search results
/sell                      → Seller landing page
/property/[id]             → Property detail page
/agents                    → Agent directory
/agents/[id]               → Agent profile
/mortgage                  → Mortgage tools
/explore                   → Neighbourhood explorer
/explore/[city]/[locality] → Neighbourhood detail page
/account                   → User dashboard
/account/saved             → Saved homes
/account/alerts            → Search alerts
/blog                      → Blog index
/blog/[slug]               → Blog post
```

---

## 6. Feature Specifications

### 6.1 Homepage

#### Hero Section
- Full-viewport background with high-quality lifestyle imagery (rotating — sold home, family, urban skyline)
- Centred search bar with three tabs: **Buy | Rent | Sold** — with city/ZIP/address autocomplete (Google Places API)
- "Popular Searches" chips below the search bar (e.g., "Homes in Mumbai", "2BHK Apartments")
- Trust bar: "250,000+ listings · 5,000+ verified agents · ₹0 listing fee for sellers"

#### Featured Listings Carousel
- Auto-scrolling card carousel — "Featured Homes", "New Listings", "Price Drops"
- Each card: photo, price (bold, blue), bed/bath/sqft, neighbourhood, "Save" heart icon
- "View All" CTA linking to filtered search results

#### Home Valuation Widget
- Address input + instant AI valuation estimate using AVM (Automated Valuation Model)
- Visible trust signal: "Based on 2M+ comparable sales data points"

#### Neighbourhood Explorer
- Interactive map-based neighbourhood cards with walk score, avg price, school rating
- Blue-green heat map overlay showing price density

#### How It Works — Buyer / Seller / Renter Tabs
- 3-step illustrated flow for each user type
- CTA at the bottom of each flow: "Start Your Search", "Get a Free Valuation", "Browse Rentals"

#### Social Proof
- Testimonial carousel with agent and buyer photos, star ratings
- Stats strip: "98% client satisfaction · ₹50Cr+ in deals closed · 4.8/5 app rating"

---

### 6.2 Property Search & Listing Pages

#### Search Results Page
- Split-screen: filter panel (left) + results + map (right) — map sticky on scroll
- Results toggleable between Card Grid and List views
- Sort by: Newest · Price (Low/High) · Most Relevant · Price Drop
- Real-time result count updating as filters change

#### Advanced Filters Panel
- Price range slider (dual-handle), Bed/Bath selectors, Property type checkboxes
- Square footage range, Year built range, Lot size, Parking, Pet-friendly
- Special filters: Open House, Price Reduced, New Construction, Foreclosure/Auction
- "Save Search" to get email alerts for new matches
- Filter state persists in URL (shareable search links)

#### Map Features
- Clustered markers with cluster count bubbles; zoom-to-expand on click
- Price labels visible on map at zoom level 14+
- Draw custom polygon to search within hand-drawn areas
- Commute time overlay — user enters work address, map shows isochrones
- School zone, flood zone, and transit overlays

#### Property Detail Page (PDP)
- Photo gallery: main image + grid of thumbnails; full-screen slideshow
- Virtual Tour button (360° embed, Matterport integration)
- Video walkthrough embed (YouTube/Vimeo or in-house upload)
- Price history chart (line graph), Zestimate/AVM comparison
- Property facts table: Beds, Baths, Sqft, Year Built, Lot, HOA, Tax
- Neighbourhood score cards: Schools, Transit, Walk Score, Bike Score
- Nearby listings carousel, recently sold comparables
- Contact Agent panel: message, call, schedule tour (inline calendar)
- Mortgage calculator pre-filled with listing price
- Share: WhatsApp, Email, Copy Link, Social

---

### 6.3 Agent Directory & Profiles

#### Agent Search
- Search by name, location, language, specialisation (luxury, first-time buyer, commercial)
- Filter by: rating, years of experience, deals closed, response time
- Agent cards: photo, name, brokerage, rating, # reviews, # deals, primary area

#### Agent Profile Page
- Professional headshot, bio, certifications, brokerage affiliation, license number
- Current active listings carousel
- Recently sold properties with price and days on market
- Client reviews with star ratings and verified buyer badges
- Direct contact: email, phone, WhatsApp, book a call (Calendly integration)
- Service area map

#### Agent Dashboard _(Authenticated — Agent Tier)_
- Lead management: incoming enquiries, response rate, conversion funnel
- Listing management: add/edit/remove listings, upload photos, set open houses
- Analytics: profile views, listing impressions, lead sources, click-through rates
- Client CRM: contact database, notes, follow-up reminders, stage tracking
- Subscription & billing management

---

### 6.4 Mortgage & Financial Tools

- **Mortgage Calculator:** loan amount, interest rate, tenure, down payment → monthly EMI output
- **Affordability Calculator:** income, expenses, debt → recommended price range
- **Pre-Qualification Form:** collects basic financial info, soft credit check, instant estimate
- **Rate Tracker:** live mortgage rate feed by lender, filterable by loan type (fixed, ARM, govt.)
- **Refinance Calculator:** existing loan vs new loan comparison with break-even timeline
- **Lender Marketplace:** verified lenders, rates, reviews, apply buttons

---

### 6.5 User Account & Personalisation

- Registration via email/phone, Google OAuth, Apple Sign-In
- Saved Homes wishlist with notes, sharing, and comparison (up to 4 homes side-by-side)
- Saved Searches with instant push notification / email alerts on new matches
- Recently Viewed with timestamps
- My Tours: upcoming and past scheduled tours
- Notification Centre: listing updates, price drops, open house reminders
- Profile completion nudges and onboarding checklist

---

### 6.6 Neighbourhood Intelligence

- Neighbourhood profile page: map, description, avg listing price trend chart
- School ratings: public/private/international, grades, GreatSchools API integration
- Crime statistics: heat map, crime type breakdown, trend over 3 years
- Nearby amenities: restaurants, hospitals, parks, grocery (Google Maps API)
- Commute calculator: to any address, by car/transit/bike
- Demographics and census data (age distribution, income, population growth)
- "Neighbourhood Score" composite index (0–100) combining all data signals

---

### 6.7 Seller Tools

- Instant Home Valuation using AVM — address entry → estimated value range in <5 sec
- "What's My Home Worth?" funnel: address → property details → contact → instant estimate + agent match
- FSBO (For Sale By Owner) listing flow: upload photos, enter details, pricing guidance, publish
- Seller Dashboard: listing performance, views, saves, enquiry count, showing feedback
- Showing management: request/approve showing times, calendar view, auto-confirm
- Offer management: receive, compare, counter-offer (integrated e-signature via DocuSign)

---

## 7. Technical Architecture

### 7.1 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | SSR/SSG for SEO, RSC for performance, edge caching |
| **UI Library** | Tailwind CSS + shadcn/ui | Utility-first, design system consistency, fast iteration |
| **State Mgmt** | Zustand + React Query | Server state sync, optimistic updates, caching |
| **Backend** | Node.js + NestJS | Modular monolith → microservices migration path |
| **Database** | PostgreSQL + PostGIS | Geospatial queries for map/radius search |
| **Search** | Elasticsearch | Full-text search, fuzzy matching, geo-search |
| **Cache** | Redis | Session data, search results, rate limiting |
| **Maps** | Mapbox GL JS | Custom tile styling (blue-green theme), vector tiles, draw |
| **CDN / Media** | Cloudflare R2 + Images | Image optimisation, global CDN, resizing on-demand |
| **Auth** | NextAuth.js / Supabase Auth | OAuth, JWT, role-based access (Buyer / Agent / Admin) |
| **Payments** | Stripe | Agent subscription billing, featured listing payments |
| **Email / SMS** | SendGrid + Twilio | Transactional emails, alert notifications, OTP |
| **Hosting** | Vercel (FE) + AWS ECS (BE) | Zero-config deploys, auto-scaling, global edge |
| **CI/CD** | GitHub Actions | Automated testing, preview deployments, semantic releases |
| **Analytics** | Mixpanel + GA4 + Hotjar | Funnel analysis, heatmaps, session recordings |
| **Monitoring** | Sentry + Datadog | Error tracking, APM, uptime monitoring |

### 7.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│   Next.js (Vercel Edge)  ·  React Native (iOS/Android)  │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTPS / WSS
┌───────────────────────▼─────────────────────────────────┐
│                    API GATEWAY                           │
│         Kong / AWS API Gateway  ·  Rate Limiting         │
└───────────────────────┬─────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌─────────────┐ ┌───────────────┐
│ Listing API  │ │  Agent API  │ │  Mortgage API │
│  (NestJS)   │ │  (NestJS)   │ │   (NestJS)    │
└──────┬───────┘ └──────┬──────┘ └───────┬───────┘
       │                │                │
       ▼                ▼                ▼
┌──────────────────────────────────────────────────┐
│            DATA LAYER                            │
│  PostgreSQL+PostGIS · Elasticsearch · Redis      │
│  Cloudflare R2 (images) · S3 (documents)        │
└──────────────────────────────────────────────────┘
```

### 7.3 Integrations

| Integration | Purpose | Phase |
|---|---|---|
| MLS / RERA Data Feed | Real-time listing ingestion + deduplication pipeline | Phase 1 |
| Google Maps / Places API | Address autocomplete, nearby POIs, directions | Phase 1 |
| Mapbox GL JS | Custom map rendering, draw tools, overlays | Phase 1 |
| Matterport SDK | 3D virtual tour embedding | Phase 1 |
| DocuSign API | E-signature for offer letters, contracts | Phase 4 |
| Mortgage APIs | Rate feeds from partner lenders (HDFC, ICICI, SBI) | Phase 2 |
| GreatSchools API | School ratings and data | Phase 2 |
| WalkScore API | Walkability, transit, and bike scores | Phase 2 |
| Calendly / Cal.com | Agent appointment scheduling | Phase 2 |
| Twilio | SMS alerts, OTP verification | Phase 1 |
| SendGrid | Transactional emails, marketing emails | Phase 1 |

### 7.4 Database Schema (Core Tables)

```sql
-- Properties
properties (
  id, title, description, price, price_per_sqft,
  property_type, beds, baths, sqft, year_built,
  status [active|sold|rented], furnished,
  locality, city, state, pincode,
  coordinates GEOMETRY(Point, 4326),
  agent_id FK, owner_id FK,
  is_featured, is_verified,
  created_at, updated_at
)

-- Agents
agents (
  id, user_id FK, license_number, brokerage,
  years_experience, specialisations[], languages[],
  rating, review_count, deals_closed,
  subscription_tier [free|basic|premium],
  created_at
)

-- Users
users (
  id, email, phone, name, avatar,
  role [buyer|seller|agent|admin],
  auth_provider, created_at
)

-- Saved Homes
saved_homes (id, user_id FK, property_id FK, notes, saved_at)

-- Saved Searches
saved_searches (
  id, user_id FK, name, filters JSONB,
  alert_frequency [instant|daily|weekly], created_at
)
```

---

## 8. Detailed Page Requirements

### 8.1 Global Components

#### Navigation Bar
- Sticky on scroll, transparent on homepage hero → solid white on scroll
- Left: EstateIQ logo (SVG), Right: nav links + "Post Property" green CTA + account icon
- Mobile: hamburger menu → full-screen drawer with all nav items
- Mega menu on "Buy", "Rent", "Sell" with popular city links

#### Footer
- 4-column layout: Company · Buyers & Sellers · Agents · Legal
- Newsletter signup inline input
- App store badges (iOS + Android)
- Social media links, RERA registration numbers by state
- Navy (`#0A2E5C`) background with white text

---

### 8.2 Listing Card Component — Full Spec

```
┌────────────────────────────────┐
│  [NEW]              [♡ Save]  │  ← badges top corners
│                                │
│      16:9 Property Image       │  ← lazy-loaded WebP
│                                │
│  [📷 Virtual Tour]             │  ← bottom-left overlay
├────────────────────────────────┤
│  ₹1.2 Cr          ₹8,500/sqft │
│  3BHK Apartment in Bandra      │  ← title, 1-line truncate
│  🛏 3  🚿 2  📐 1,450 sq.ft  │
│  📍 Bandra West, Mumbai        │
├────────────────────────────────┤
│  [Agent Photo] Rahul S.   3d  │  ← agent + days ago
└────────────────────────────────┘
```

**Conditional Badges:**
- `NEW` → green background, shown if listed < 7 days
- `PRICE DROP` → blue background, shown if price reduced < 30 days
- `FEATURED` → navy background, paid featured slot
- `VIRTUAL TOUR` → teal camera icon overlay

---

### 8.3 Search Filters — Full List

```
PRICE
  ├── Min Price (₹) ────────────●──── Max Price (₹)
  └── [₹25L] [₹50L] [₹1Cr] [₹2Cr] quick-select chips

BEDROOMS
  └── [1] [2] [3] [4] [5+] pill buttons (multi-select)

BATHROOMS
  └── [1] [2] [3+] pill buttons

PROPERTY TYPE
  └── ☐ Apartment  ☐ Villa  ☐ Plot  ☐ Commercial  ☐ PG

FURNISHING
  └── ◉ Any  ○ Furnished  ○ Semi  ○ Unfurnished

POSTED BY
  └── ☐ Builder  ☐ Owner  ☐ Agent

AREA (sq.ft)
  └── Min ──────●────── Max

AMENITIES
  └── ☐ Gym  ☐ Pool  ☐ Parking  ☐ Security  ☐ Lift
      ☐ Power Backup  ☐ Gas Pipeline  ☐ Clubhouse

SPECIAL
  └── ☐ Open House  ☐ New Construction  ☐ RERA Verified
      ☐ Price Drop  ☐ Ready to Move
```

---

### 8.4 SEO Requirements

- SSR for all listing pages — Google can index individual property pages
- Dynamic Open Graph and Twitter Card meta tags per listing (photo, price, address)
- JSON-LD structured data: `RealEstateListing`, `BreadcrumbList`, `FAQPage` schemas
- `sitemap.xml` auto-generated with all property, agent, neighbourhood pages
- Canonical URLs to prevent duplicate content on filtered search pages
- City/neighbourhood landing pages with localised content for long-tail SEO
- Core Web Vitals targets: LCP < 2.5s · FID < 100ms · CLS < 0.1

---

## 9. Mobile Application

### 9.1 Platforms

- **React Native (Expo)** for iOS and Android — single codebase, 90%+ code share
- Target: iOS 15+ and Android 10+
- Offline-capable: saved homes and recently viewed available offline

### 9.2 Mobile-Specific Features

- Push notifications: price drops, new matches, open house reminders, message alerts
- Biometric authentication: Face ID / Fingerprint login
- AR feature: "See it in AR" — point camera at street to see for-sale overlays
- "Nearby Me" mode: GPS-based listing discovery with distance displayed
- Mortgage calculator widget (iOS/Android home screen widget)
- QR scanner: scan open house QR codes to instantly save a listing
- Native share sheet integration for property sharing

### 9.3 App Screens

```
Bottom Tab Bar:
  🔍 Search  ·  ❤️ Saved  ·  🏠 Home  ·  👤 Profile  ·  🔔 Alerts
```

---

## 10. Non-Functional Requirements

| Category | Requirement | Acceptance Criteria |
|---|---|---|
| **Performance** | Page load time (critical pages) | LCP < 2.5s on 4G; TTFB < 400ms |
| **Performance** | Search results latency | < 300ms cached; < 800ms cold |
| **Scalability** | Concurrent users | 50,000 concurrent without degradation |
| **Availability** | Uptime SLA | 99.9% (< 8.7 hr downtime/year) |
| **Security** | Data protection | AES-256 at rest; TLS 1.3 in transit; OWASP Top 10 compliant |
| **Security** | PII handling | GDPR / DPDP Act compliant; right-to-delete flow |
| **Accessibility** | Standards compliance | WCAG 2.1 AA; keyboard navigable; screen reader tested |
| **SEO** | Core Web Vitals | All pages: LCP Good, FID Good, CLS < 0.1 |
| **Data Freshness** | MLS listing sync interval | Listings updated every 15 min; sold status within 1 hr |
| **Internationalisation** | Languages & Currency | English (Phase 1); Hindi + Tamil (Phase 2); INR default |
| **Browser Support** | Minimum support | Chrome 90+, Safari 14+, Firefox 88+, Edge 90+ |

---

## 11. Phased Delivery Roadmap

| Phase | Timeline | Scope | Success Gate |
|---|---|---|---|
| **Phase 0 — Foundation** | Months 1–2 | Design system · Component library · DB/infra setup · Auth · CI/CD · MLS ingestion pipeline | Design approved; pipeline live |
| **Phase 1 — MVP** | Months 3–5 | Homepage · Search (map + filters) · PDP · Agent directory · User accounts · Basic mobile app | 5,000 beta users; search works end-to-end |
| **Phase 2 — Growth** | Months 6–8 | Agent dashboard · Seller tools · Mortgage tools · Neighbourhood pages · Virtual tours · SEO content engine | 50,000 MAU; 500 agents onboarded |
| **Phase 3 — Monetisation** | Months 9–11 | Premium agent subscriptions · Featured listings · Lender marketplace · Lead scoring · Advanced analytics | $100K MRR; 2,000 paid agents |
| **Phase 4 — Scale** | Month 12+ | AR features · Offer management · E-signature · Hindi/Tamil localisation · New cities expansion | 250,000 MAU; $2M ARR |

### Sprint Cadence

```
Week 1–2:   Discovery & design
Week 3–4:   Core components
Week 5–6:   Feature development
Week 7:     QA & accessibility audit
Week 8:     Staging deploy + stakeholder review
```

---

## 12. Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| MLS/RERA data not available in all cities | 🔴 High | 🔴 High | Negotiate data agreements early; use web scraping as fallback with ToS review |
| Agent cold start — low listing supply at launch | 🔴 High | 🔴 High | Seed with top agencies; offer 6-month free premium tier to early adopters |
| Search ranking dominated by incumbents | 🟡 Medium | 🔴 High | Focus on long-tail neighbourhood SEO; mobile-first as differentiator |
| Data privacy regulations (DPDP Act, GDPR) | 🟡 Medium | 🔴 High | Appoint DPO; conduct privacy impact assessments quarterly |
| Map API cost overruns at scale | 🟡 Medium | 🟡 Medium | Aggressive tile caching; evaluate Mapbox vs Google cost at 100K MAU |
| Core team hiring velocity | 🟢 Low | 🔴 High | Retain specialist contractors for Phase 0; convert to FTE in Phase 1 |
| Mobile AR feature complexity | 🟡 Medium | 🟢 Low | Defer to Phase 4; ship without AR in MVP |

---

## 13. Team & Resourcing

| Role | Headcount (Phase 1) | Key Responsibilities |
|---|---|---|
| Product Manager | 1 | Roadmap, backlog, stakeholder alignment, OKRs |
| UI/UX Designer | 2 (Lead + Interaction) | Design system, wireframes, prototypes, user research, handoff |
| Frontend Engineers | 3 | Next.js, component library, map integration, performance |
| Backend Engineers | 2 | API, MLS pipeline, search, auth, payments |
| Mobile Engineer | 1 | React Native app, push notifications, AR (Phase 4) |
| DevOps / SRE | 1 | Infrastructure, CI/CD, monitoring, scaling |
| QA Engineer | 1 | Manual + automated testing, accessibility audits |
| Content / SEO Strategist | 1 | Blog, neighbourhood pages, on-page SEO, structured data |
| Data Analyst | 1 _(Phase 2+)_ | KPI dashboards, A/B test analysis, AVM model maintenance |

**Total Phase 1 Team:** 12 people

---

## 14. Appendix

### 14.1 Competitive Analysis

| Feature | EstateIQ | Magicbricks | 99acres | Housing.com |
|---|---|---|---|---|
| Virtual Tours | ✅ Phase 1 | Limited | Limited | ✅ |
| Draw-on-map search | ✅ | ❌ | ❌ | ✅ |
| Commute overlay | ✅ | ❌ | ❌ | Partial |
| Agent CRM | ✅ Phase 2 | Basic | Basic | ❌ |
| Offer management | ✅ Phase 4 | ❌ | ❌ | ❌ |
| AR property view | ✅ Phase 4 | ❌ | ❌ | ❌ |
| Mobile App Quality | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Design Quality | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |

### 14.2 Glossary

| Term | Definition |
|---|---|
| **AVM** | Automated Valuation Model — algorithm-based property price estimation using comparable sales data |
| **LCP** | Largest Contentful Paint — Core Web Vital measuring perceived page load speed |
| **MLS** | Multiple Listing Service — database of property listings shared among real estate brokers |
| **RERA** | Real Estate Regulatory Authority — Indian regulatory body governing real estate projects |
| **PDP** | Property Detail Page — the individual listing page for a single property |
| **FSBO** | For Sale By Owner — direct seller listing without agent representation |
| **CRM** | Customer Relationship Management — software to manage leads, clients, and interactions |
| **OKR** | Objective and Key Result — goal-setting framework for teams and individuals |
| **DPDP** | Digital Personal Data Protection Act — India's data privacy law (2023) |
| **PostGIS** | PostgreSQL extension enabling geospatial queries (radius search, polygon search) |

### 14.3 Open Questions

- [ ] Which MLS/RERA data provider to partner with for Phase 1 cities?
- [ ] FSBO listing fee model — flat fee, % of sale, or freemium?
- [ ] AR tech partner — build in-house or use 8th Wall / Niantic?
- [ ] Mortgage pre-approval — in-house underwriting or pure marketplace?
- [ ] Data residency — AWS Mumbai region only, or multi-region from Day 1?

---

> **Document Control:** This document is confidential and intended for internal use only. Distribution outside the core product team requires written approval from the Product Lead. All feature estimates are subject to change based on technical discovery and business priorities. Next review: 2-week sprint planning sessions — roadmap updated monthly.

---

*— End of Document — EstateIQ PRD v1.0 · March 2026*