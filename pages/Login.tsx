import { useState, useContext, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { RouterContext } from "../App";
import { useAuth } from "../components/AuthContext";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  Brain, 
  User, 
  Building, 
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Shield,
  Zap,
  Users
} from "lucide-react";

interface FormData {
  email: string;
  password: string;
  remember: boolean;
  // Signup fields
  firstName?: string;
  lastName?: string;
  company?: string;
  role?: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function Login() {
  const { navigate } = useContext(RouterContext);
  const { login, signup, isAuthenticated } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    remember: false,
    firstName: "",
    lastName: "",
    company: "",
    role: "",
    confirmPassword: "",
    acceptTerms: false
  });

  // Check URL params for signup mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('signup') === 'true') {
      setIsSignup(true);
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (isSignup && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Signup-specific validation
    if (isSignup) {
      if (!formData.firstName?.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName?.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.company?.trim()) {
        newErrors.company = 'Company name is required';
      }
      if (!formData.role) {
        newErrors.role = 'Role is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      if (isSignup) {
        await signup(formData);
      } else {
        await login(formData.email, formData.password, formData.remember);
      }

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setErrors({});
    setFormData({
      email: "",
      password: "",
      remember: false,
      firstName: "",
      lastName: "",
      company: "",
      role: "",
      confirmPassword: "",
      acceptTerms: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-electric-blue/5 via-white to-ai-purple/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-electric-blue rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-electric-blue">AceInt</span>
          </div>
        </div>

        {/* Logo and Brand */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {isSignup ? 'Join AceInt' : 'Welcome back'}
          </h1>
          <p className="text-muted-foreground">
            {isSignup 
              ? 'Start transforming your hiring process with AI' 
              : 'Sign in to your recruitment dashboard'
            }
          </p>
          {isSignup && (
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-neon-green" />
                <span>WCAG 2.1 AA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-ai-purple" />
                <span>70% Faster Hiring</span>
              </div>
            </div>
          )}
        </div>

        {/* Demo Credentials Banner */}
        {!isSignup && (
          <Alert className="border-neon-green/20 bg-neon-green/5">
            <CheckCircle className="h-4 w-4 text-neon-green" />
            <AlertDescription className="text-sm">
              <strong>Demo Credentials:</strong><br />
              Email: <code className="bg-muted px-1 py-0.5 rounded text-xs">demo@aceint.com</code><br />
              Password: <code className="bg-muted px-1 py-0.5 rounded text-xs">demo123</code>
            </AlertDescription>
          </Alert>
        )}

        {/* Auth Form */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl">
              {isSignup ? 'Create Account' : 'Sign In'}
            </CardTitle>
            <CardDescription>
              {isSignup 
                ? 'Fill out the form below to get started' 
                : 'Enter your credentials to access your account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {errors.general && (
              <Alert className="border-danger-red/20 bg-danger-red/5">
                <AlertCircle className="h-4 w-4 text-danger-red" />
                <AlertDescription className="text-danger-red">
                  {errors.general}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Signup Fields */}
              {isSignup && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-danger-red">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName || ''}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`pl-10 ${errors.firstName ? 'border-danger-red focus:border-danger-red' : ''}`}
                          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                        />
                      </div>
                      {errors.firstName && (
                        <p id="firstName-error" className="text-sm text-danger-red" role="alert">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-danger-red">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName || ''}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'border-danger-red focus:border-danger-red' : ''}
                        aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                      />
                      {errors.lastName && (
                        <p id="lastName-error" className="text-sm text-danger-red" role="alert">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">
                      Company Name <span className="text-danger-red">*</span>
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        type="text"
                        placeholder="Acme Corporation"
                        value={formData.company || ''}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className={`pl-10 ${errors.company ? 'border-danger-red focus:border-danger-red' : ''}`}
                        aria-describedby={errors.company ? 'company-error' : undefined}
                      />
                    </div>
                    {errors.company && (
                      <p id="company-error" className="text-sm text-danger-red" role="alert">
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">
                      Your Role <span className="text-danger-red">*</span>
                    </Label>
                    <Select 
                      value={formData.role || ''} 
                      onValueChange={(value) => handleInputChange('role', value)}
                    >
                      <SelectTrigger 
                        className={errors.role ? 'border-danger-red' : ''}
                        aria-describedby={errors.role ? 'role-error' : undefined}
                      >
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr-manager">HR Manager</SelectItem>
                        <SelectItem value="recruiter">Recruiter</SelectItem>
                        <SelectItem value="talent-acquisition">Talent Acquisition Lead</SelectItem>
                        <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
                        <SelectItem value="ceo">CEO/Founder</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p id="role-error" className="text-sm text-danger-red" role="alert">
                        {errors.role}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-danger-red">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-danger-red focus:border-danger-red' : ''}`}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-sm text-danger-red" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-danger-red">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isSignup ? "Create a strong password" : "Enter your password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? 'border-danger-red focus:border-danger-red' : ''}`}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-sm text-danger-red" role="alert">
                    {errors.password}
                  </p>
                )}
                {isSignup && (
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>

              {/* Confirm Password for Signup */}
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirm Password <span className="text-danger-red">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword || ''}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-danger-red focus:border-danger-red' : ''}`}
                      aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p id="confirmPassword-error" className="text-sm text-danger-red" role="alert">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Remember Me / Accept Terms */}
              <div className="space-y-3">
                {!isSignup ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.remember}
                        onCheckedChange={(checked) => handleInputChange('remember', checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={() => {/* TODO: Handle forgot password */}}
                      className="text-sm text-electric-blue hover:text-electric-blue/80 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms || false}
                        onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                        className={errors.acceptTerms ? 'border-danger-red' : ''}
                      />
                      <Label htmlFor="acceptTerms" className="text-sm leading-5">
                        I agree to the{' '}
                        <button type="button" className="text-electric-blue hover:text-electric-blue/80 underline">
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button type="button" className="text-electric-blue hover:text-electric-blue/80 underline">
                          Privacy Policy
                        </button>
                      </Label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-sm text-danger-red" role="alert">
                        {errors.acceptTerms}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white py-3 text-base font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSignup ? 'Creating Account...' : 'Signing In...'}
                  </>
                ) : (
                  <>
                    {isSignup ? 'Create Account' : 'Sign In'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Social Login */}
            {!isSignup && (
              <>
                <Separator className="my-6" />
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </Button>
                </div>
              </>
            )}

            {/* Toggle Auth Mode */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-electric-blue hover:text-electric-blue/80 font-medium transition-colors underline"
                >
                  {isSignup ? 'Sign in here' : 'Sign up here'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features for Signup */}
        {isSignup && (
          <Card className="border-ai-purple/20 bg-ai-purple/5">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-ai-purple/10 rounded-lg">
                    <Brain className="h-4 w-4 text-ai-purple" />
                  </div>
                  <p className="text-xs text-muted-foreground">AI Powered</p>
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-neon-green/10 rounded-lg">
                    <Users className="h-4 w-4 text-neon-green" />
                  </div>
                  <p className="text-xs text-muted-foreground">50k+ Companies</p>
                </div>
                <div className="space-y-2">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-electric-blue/10 rounded-lg">
                    <Shield className="h-4 w-4 text-electric-blue" />
                  </div>
                  <p className="text-xs text-muted-foreground">Secure & Compliant</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground space-x-4">
          <button className="hover:text-foreground transition-colors">
            Privacy Policy
          </button>
          <span>•</span>
          <button className="hover:text-foreground transition-colors">
            Terms of Service
          </button>
          {isSignup && (
            <>
              <span>•</span>
              <button className="hover:text-foreground transition-colors">
                Help Center
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}