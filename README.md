# Belize Farmer Portal PWA

A Progressive Web App for the National Farmer Registry of Belize, providing agricultural resources, weather information, and farmer management tools.

## Features

### Mobile-First Design
- **Bottom Navigation (Mobile)**: Native app-like navigation bar on devices < 768px
- **Top Header (Desktop)**: Traditional header with sidebar menu on larger screens
- **Responsive Layout**: Adapts seamlessly across all screen sizes

### Public Access
- Home dashboard with weather, news, and seasonal tips
- Interactive planting & harvesting calendar
- 7-day weather forecast
- Resources and extension services contacts
- Easy farmer registration

### Private Farmer Area
- Personal dashboard with quick actions
- Profile management with update requests
- Electronic Farmer ID with QR code (verified farmers)
- Farm records and plot tracking (verified farmers)
- Notification center with preferences

### User Status Levels
- **Unverified**: Basic access, can register and view public content
- **Pending**: Awaiting verification from extension officer
- **Verified**: Full access to e-ID and farm records

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Demo Login

Use any email and password to login:
- `john@example.com` - Verified farmer (full access)
- `maria@example.com` - Pending verification (limited features)

## Technology Stack

- **Framework**: Angular 21
- **Styling**: Custom CSS with CSS Variables
- **State**: Angular Signals
- **Routing**: Angular Router with lazy loading
- **Data**: Dummy data services (no external database)

## Mobile Navigation

### On Mobile (< 768px)
- Fixed bottom navigation bar
- 5 items for public users: Home, Calendar, Weather, Resources, Login
- 5 items for authenticated users: Dashboard, Profile, ID/Calendar, Records/Weather, Alerts
- Notification badges on alerts
- Verified users see Farmer ID and Records; unverified see Calendar instead

### On Desktop (≥ 768px)
- Top header with branding and actions
- Slide-out sidebar menu for navigation
- Full notification button in header

## Deployment

The app is configured for deployment on Bolt with subdomain support.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
src/
├── app/
│   ├── auth/          # Login and registration
│   ├── core/          # Services and guards
│   ├── models/        # TypeScript interfaces
│   ├── private/       # Authenticated user pages
│   ├── public/        # Public access pages
│   └── shared/        # Shared components (header, bottom-nav)
├── global_styles.css  # Global styles and variables
└── main.ts           # App bootstrap
```

## Build Output

- **Initial Bundle**: ~84 KB (gzipped)
- **Lazy Loaded**: Components loaded on-demand
- **Output**: `dist/browser/`

## PWA Features

- Manifest file for installability
- Mobile-optimized meta tags
- Offline-ready structure
- Safe area insets for notched devices
