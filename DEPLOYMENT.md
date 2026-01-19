# Belize Farmer Portal - Deployment Guide

## Deployment Configuration

This Angular application is configured for deployment on Bolt with subdomain support.

### Build Configuration

- **Output Directory**: `dist/browser`
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Dev Command**: `npm start`

### What's Configured

1. **Production Build**: The build script uses production configuration with optimizations
2. **SPA Routing**: `_redirects` file ensures all routes work correctly
3. **PWA Support**: Manifest file configured for Progressive Web App features
4. **Base Path**: Configured to work with subdomain deployment

### Deployment Files

- `.bolt/config.json` - Bolt deployment configuration
- `public/_redirects` - SPA routing configuration (copied to dist/browser)
- `public/manifest.json` - PWA manifest (copied to dist/browser)

### How to Deploy

The application is ready for deployment. Bolt will:
1. Run `npm install` to install dependencies
2. Run `npm run build` to build the production version
3. Serve files from `dist/browser` directory
4. Handle routing via the `_redirects` file

### Testing Locally

```bash
# Install dependencies
npm install

# Development server
npm start

# Production build
npm run build

# The built files will be in dist/browser/
```

### Features Ready for Production

- Mobile-first responsive design with native app-like bottom navigation
- Adaptive UI: Bottom nav on mobile (< 768px), header on desktop
- Public access pages (home, calendar, weather, resources)
- Authentication with login/register flows
- Private farmer area with dashboard, profile, e-ID, and farm records
- Dummy data for all features
- PWA capabilities with manifest and offline support

### Login Credentials (Demo)

Use any email and password to login. Two test accounts:
- `john@example.com` - Verified farmer (full access)
- `maria@example.com` - Pending verification (limited access)

### Important Notes

- The app uses dummy data (no database)
- Login accepts any credentials for demonstration
- All routes are client-side and handled by Angular Router
- The `_redirects` file ensures deep linking works correctly
