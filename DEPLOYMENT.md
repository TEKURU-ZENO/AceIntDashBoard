# AceInt Deployment Guide

## Overview
AceInt is a production-ready React application built with Vite, TypeScript, and Tailwind CSS v4. This guide covers deployment to various platforms.

## Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Git for version control

## Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd aceint-recruitment-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:3000
```

## Build for Production

```bash
# Type check
npm run type-check

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## Platform Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel automatically detects Vite and uses the included `vercel.json`
3. Deploy with one click

**Manual deployment:**
```bash
npm install -g vercel
vercel --prod
```

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `netlify.toml` handles redirects

**Manual deployment:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
# Install gh-pages
npm install -g gh-pages

# Build and deploy
npm run build
gh-pages -d dist
```

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Build and run:
```bash
docker build -t aceint .
docker run -p 8080:80 aceint
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Update values for your environment. Most variables are optional for basic deployment.

## Performance Optimizations

The build is already optimized with:
- Code splitting by vendor, router, and UI libraries
- Tree shaking for unused code
- Minification with esbuild
- Modern ES2020 target
- Optimized font loading
- Image optimization ready

## Security Headers

Security headers are configured in both `netlify.toml` and `vercel.json`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## Monitoring & Analytics

To enable analytics, update environment variables:
```bash
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_ENABLE_ANALYTICS=true
```

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS settings

## SSL/HTTPS

Both Vercel and Netlify provide automatic HTTPS certificates. No additional configuration needed.

## Post-Deployment Checklist

- [ ] Test all routes and navigation
- [ ] Verify responsive design on mobile/tablet
- [ ] Check authentication flow
- [ ] Test form submissions
- [ ] Validate accessibility features
- [ ] Confirm loading states work
- [ ] Test dark/light mode switching
- [ ] Verify all icons and images load
- [ ] Check performance with Lighthouse
- [ ] Test offline functionality (if PWA enabled)

## Troubleshooting

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

### Route Issues
Ensure platform redirects are configured for SPA routing (handled in config files).

### Font Loading
Fonts are loaded from Google Fonts CDN. Check network connectivity if fonts don't load.

### Missing Assets
Verify all referenced assets are in the `/public` directory.

## Production URLs

After deployment, your AceInt platform will be accessible at:
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-project.netlify.app`
- Custom domain: `https://yourdomain.com`

## Support

For deployment issues:
1. Check build logs for specific errors
2. Verify environment variables are set correctly
3. Ensure Node.js version compatibility (18+)
4. Review platform-specific documentation

The application is fully self-contained and ready for production deployment with any static hosting provider.