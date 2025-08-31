import React, { useContext } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/check/ImageWithFallback';
import { RouterContext } from '../App';
import {
  Brain,
  Users,
  BarChart3,
  Clock,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Play,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Award,
  TrendingUp,
  Globe,
  Target
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Screening',
    description: 'Advanced machine learning algorithms automatically screen and rank candidates based on job requirements.',
    color: 'ai-purple'
  },
  {
    icon: Users,
    title: 'Smart Candidate Matching',
    description: 'Find the perfect candidates with intelligent matching that considers skills, experience, and cultural fit.',
    color: 'electric-blue'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Get deep insights into your recruitment pipeline with comprehensive analytics and reporting.',
    color: 'neon-green'
  },
  {
    icon: Clock,
    title: 'Automated Workflows',
    description: 'Streamline your hiring process with automated interview scheduling and candidate communication.',
    color: 'electric-blue'
  },
  {
    icon: Shield,
    title: 'Bias-Free Hiring',
    description: 'AI-powered bias detection ensures fair and equitable hiring practices across all candidates.',
    color: 'ai-purple'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Reduce time-to-hire by up to 70% with intelligent automation and streamlined processes.',
    color: 'neon-green'
  }
];

const stats = [
  { value: '50k+', label: 'Companies Trust AceInt', icon: Building2 },
  { value: '2M+', label: 'Candidates Matched', icon: Users },
  { value: '70%', label: 'Faster Hiring', icon: Clock },
  { value: '95%', label: 'Customer Satisfaction', icon: Star }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'VP of Talent, TechCorp',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=80&h=80&fit=crop&crop=face',
    content: 'AceInt transformed our hiring process. We reduced time-to-hire by 65% and found better candidates.',
    rating: 5
  },
  {
    name: 'Michael Rodriguez',
    role: 'HR Director, StartupX',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    content: 'The AI screening is incredibly accurate. It saved us hundreds of hours in manual resume review.',
    rating: 5
  },
  {
    name: 'Emily Johnson',
    role: 'Talent Acquisition Lead, Scale Inc',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    content: 'Best recruitment platform we\'ve used. The analytics help us continuously improve our hiring.',
    rating: 5
  }
];

// Import Building2 separately since it might not be in the main import
import { Building2 } from 'lucide-react';

export default function Home() {
  const { navigate } = useContext(RouterContext);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-electric-blue rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-electric-blue">AceInt</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/login?signup=true')}
              className="bg-electric-blue hover:bg-electric-blue/90 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-ai-purple/10 text-ai-purple border-ai-purple/20 hover:bg-ai-purple/20">
                  🚀 AI-Powered Recruitment Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Hire <span className="text-electric-blue">Smarter</span> with{' '}
                  <span className="text-ai-purple">AI</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transform your recruitment process with AceInt's AI-powered platform. 
                  Screen candidates faster, make better hiring decisions, and build exceptional teams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/login?signup=true')}
                  className="bg-electric-blue hover:bg-electric-blue/90 text-white px-8 py-3 text-base"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('demo')}
                  className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-8 py-3 text-base"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-electric-blue/10 border-2 border-background flex items-center justify-center">
                      <User className="h-4 w-4 text-electric-blue" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Trusted by <span className="font-semibold text-foreground">50,000+</span> companies worldwide
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1579389248774-07907f421a6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTY1ODAyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Modern team collaboration"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-ai-purple/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-neon-green/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-electric-blue/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-electric-blue" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-electric-blue/10 text-electric-blue border-electric-blue/20 mb-4">
              ✨ Powerful Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything you need to hire better
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides all the tools you need to streamline 
              your recruitment process and make better hiring decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-${feature.color}/10 rounded-lg mb-4`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-ai-purple/10 text-ai-purple border-ai-purple/20">
                🎯 See It In Action
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Experience the power of AI-driven recruitment
              </h2>
              <p className="text-lg text-muted-foreground">
                Watch how AceInt's AI analyzes resumes, matches candidates, and provides 
                intelligent insights to help you make better hiring decisions.
              </p>
              <ul className="space-y-3">
                {[
                  'Automated resume screening and ranking',
                  'AI-powered candidate matching',
                  'Bias detection and mitigation',
                  'Comprehensive analytics dashboard'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-neon-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhc2hib2FyZCUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTY0NjY3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Business analytics dashboard"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <Button 
                size="lg"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30"
              >
                <Play className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-neon-green/10 text-neon-green border-neon-green/20 mb-4">
              💬 Customer Love
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What our customers say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of companies that have transformed their hiring with AceInt
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-electric-blue">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to revolutionize your hiring?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies using AceInt to build better teams faster. 
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/login?signup=true')}
              className="bg-white text-electric-blue hover:bg-gray-100 px-8 py-3 text-base"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-electric-blue px-8 py-3 text-base"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-charcoal-gray text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-electric-blue rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">AceInt</span>
              </div>
              <p className="text-gray-300">
                AI-powered recruitment platform helping companies build better teams faster.
              </p>
              <div className="flex gap-4">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors">Features</button></li>
                <li><button className="hover:text-white transition-colors">Pricing</button></li>
                <li><button className="hover:text-white transition-colors">Integrations</button></li>
                <li><button className="hover:text-white transition-colors">API</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors">About</button></li>
                <li><button className="hover:text-white transition-colors">Blog</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Press</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@aceint.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AceInt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add User icon import
import { User } from 'lucide-react';