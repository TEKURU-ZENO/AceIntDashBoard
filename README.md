# AceInt - AI-Powered Recruitment Platform

A comprehensive recruitment platform featuring Electric Blue (#0066FF), AI Purple (#8B5CF6), and Neon Green (#00E676) as primary colors, built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Real-time KPI tracking with pulsing animations and trend charts
- **Job Management**: Create, manage, and track job postings with AI insights
- **Candidate Pipeline**: AI-powered candidate screening with confidence scoring
- **Analytics**: Comprehensive recruitment metrics and performance insights
- **Responsive Design**: Mobile-first approach with WCAG 2.1 AA compliance
- **Modern UI**: Smooth animations, drag-and-drop functionality, and micro-interactions

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Typography**: Inter font family

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aceint-recruitment-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
aceint-recruitment-platform/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   └── figma/           # Figma-specific components
├── pages/               # Page components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Jobs.tsx         # Job management
│   ├── Candidates.tsx   # Candidate pipeline
│   ├── Analytics.tsx    # Analytics dashboard
│   └── Login.tsx        # Authentication
├── styles/              # Global styles and CSS
└── public/              # Static assets
```

## Design System

### Colors
- **Electric Blue**: #0066FF (Primary actions, links)
- **AI Purple**: #8B5CF6 (AI features, secondary actions)
- **Neon Green**: #00E676 (Success states, positive metrics)
- **Charcoal Gray**: #2D3748 (Text, dark elements)
- **Light Gray**: #F7FAFC (Backgrounds)

### Typography
- **Font Family**: Inter
- **Base Font Size**: 14px
- **Responsive scaling** across all screen sizes

### Animations
- **Pulse Glow**: For updated metrics and notifications
- **Smooth Transitions**: 0.3s cubic-bezier easing
- **Progress Rings**: For AI confidence scoring

## Demo Credentials

To test the application, use these demo credentials:

**Email**: `demo@aceint.com`  
**Password**: `demo123`

The authentication system is set up for frontend development with mock data.

## Deployment

This project is **deployment ready** with configurations for multiple platforms.

### Quick Deploy Options

**Vercel** (Recommended):
```bash
npm install -g vercel
vercel --prod
```

**Netlify**:
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Manual Build**:
```bash
npm run build
# Deploy the dist/ directory to any static hosting
```

### Platform Support

- ✅ Vercel (auto-detected, includes vercel.json)
- ✅ Netlify (includes netlify.toml with redirects)
- ✅ GitHub Pages
- ✅ AWS S3 + CloudFront
- ✅ Azure Static Web Apps
- ✅ Any static hosting provider

### Environment Variables

Copy `.env.example` to `.env` for configuration:

```bash
cp .env.example .env
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary software. All rights reserved.

## Support

For technical support or questions, please contact the development team.