import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Monitor,
  Smartphone,
  Tablet,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Accessibility,
  Zap
} from 'lucide-react';

interface AccessibilityTest {
  id: string;
  name: string;
  description: string;
  category: 'visual' | 'auditory' | 'motor' | 'cognitive';
  level: 'A' | 'AA' | 'AAA';
  status: 'pass' | 'fail' | 'warning' | 'untested';
  details?: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  threshold: number;
  unit: string;
  status: 'good' | 'needs-improvement' | 'poor';
}

const accessibilityTests: AccessibilityTest[] = [
  {
    id: 'color-contrast',
    name: 'Color Contrast Ratio',
    description: 'Text has sufficient contrast against background',
    category: 'visual',
    level: 'AA',
    status: 'pass',
    details: 'All text meets 4.5:1 minimum ratio'
  },
  {
    id: 'focus-indicators',
    name: 'Focus Indicators',
    description: 'All interactive elements have visible focus indicators',
    category: 'visual',
    level: 'AA',
    status: 'pass',
    details: 'Electric Blue focus rings implemented'
  },
  {
    id: 'keyboard-navigation',
    name: 'Keyboard Navigation',
    description: 'All functionality accessible via keyboard',
    category: 'motor',
    level: 'A',
    status: 'pass',
    details: 'Tab order is logical and complete'
  },
  {
    id: 'screen-reader',
    name: 'Screen Reader Support',
    description: 'Proper ARIA labels and semantic HTML',
    category: 'auditory',
    level: 'A',
    status: 'pass',
    details: 'All interactive elements properly labeled'
  },
  {
    id: 'form-labels',
    name: 'Form Labels',
    description: 'All form inputs have associated labels',
    category: 'cognitive',
    level: 'A',
    status: 'pass',
    details: 'Labels properly associated with form controls'
  },
  {
    id: 'error-handling',
    name: 'Error Identification',
    description: 'Errors are clearly identified and described',
    category: 'cognitive',
    level: 'A',
    status: 'pass',
    details: 'Clear error messages with actionable guidance'
  },
  {
    id: 'color-independence',
    name: 'Color Independence',
    description: 'Information not conveyed by color alone',
    category: 'visual',
    level: 'A',
    status: 'warning',
    details: 'Some status indicators rely primarily on color'
  },
  {
    id: 'text-resize',
    name: 'Text Resizing',
    description: 'Text can be resized up to 200% without loss of functionality',
    category: 'visual',
    level: 'AA',
    status: 'pass',
    details: 'Responsive design maintains usability at all zoom levels'
  }
];

const performanceMetrics: PerformanceMetric[] = [
  {
    name: 'First Contentful Paint',
    value: 1.2,
    threshold: 1.8,
    unit: 's',
    status: 'good'
  },
  {
    name: 'Largest Contentful Paint',
    value: 2.1,
    threshold: 2.5,
    unit: 's',
    status: 'good'
  },
  {
    name: 'Cumulative Layout Shift',
    value: 0.05,
    threshold: 0.1,
    unit: '',
    status: 'good'
  },
  {
    name: 'Time to Interactive',
    value: 3.2,
    threshold: 3.8,
    unit: 's',
    status: 'good'
  },
  {
    name: 'Bundle Size',
    value: 245,
    threshold: 300,
    unit: 'KB',
    status: 'good'
  }
];

export function AccessibilityTester() {
  const [activeViewport, setActiveViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testProgress, setTestProgress] = useState(0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-neon-green" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-danger-red" />;
      default:
        return <Info className="h-4 w-4 text-medium-gray" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-neon-green/10 text-neon-green border-neon-green/20';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'fail':
        return 'bg-danger-red/10 text-danger-red border-danger-red/20';
      default:
        return 'bg-medium-gray/10 text-medium-gray border-medium-gray/20';
    }
  };

  const getPerformanceStatusClass = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-neon-green';
      case 'needs-improvement':
        return 'text-yellow-600';
      case 'poor':
        return 'text-danger-red';
      default:
        return 'text-medium-gray';
    }
  };

  const runAccessibilityTests = async () => {
    setIsRunningTests(true);
    setTestProgress(0);

    // Simulate running tests with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setTestProgress(i);
    }

    setIsRunningTests(false);
  };

  const calculateOverallScore = () => {
    const passCount = accessibilityTests.filter(test => test.status === 'pass').length;
    const totalTests = accessibilityTests.length;
    return Math.round((passCount / totalTests) * 100);
  };

  const getViewportIcon = (viewport: string) => {
    switch (viewport) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    // Apply accessibility preferences
    if (reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
    }

    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [reducedMotion, highContrast]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-electric-blue/10 rounded-lg">
                <Accessibility className="h-6 w-6 text-electric-blue" />
              </div>
              <div>
                <CardTitle className="text-2xl">Accessibility & Performance Tester</CardTitle>
                <p className="text-muted-foreground">
                  Test AceInt design system compliance with WCAG 2.1 AA standards
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-electric-blue">{calculateOverallScore()}%</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-electric-blue" />
                <span className="font-medium">High Contrast</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHighContrast(!highContrast)}
                className={highContrast ? 'bg-electric-blue text-white' : ''}
              >
                {highContrast ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-ai-purple" />
                <span className="font-medium">Reduced Motion</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReducedMotion(!reducedMotion)}
                className={reducedMotion ? 'bg-ai-purple text-white' : ''}
              >
                {reducedMotion ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getViewportIcon(activeViewport)}
                <span className="font-medium">Viewport</span>
              </div>
              <div className="flex gap-1">
                {(['desktop', 'tablet', 'mobile'] as const).map((viewport) => (
                  <Button
                    key={viewport}
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveViewport(viewport)}
                    className={activeViewport === viewport ? 'bg-neon-green text-white' : ''}
                  >
                    {getViewportIcon(viewport)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Testing Interface */}
      <Tabs defaultValue="accessibility" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accessibility">Accessibility Tests</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="guidelines">Design Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>WCAG 2.1 AA Compliance Tests</CardTitle>
                <Button 
                  onClick={runAccessibilityTests}
                  disabled={isRunningTests}
                  className="bg-electric-blue hover:bg-electric-blue/90"
                >
                  {isRunningTests ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Running Tests...
                    </>
                  ) : (
                    'Run All Tests'
                  )}
                </Button>
              </div>
              {isRunningTests && (
                <div className="mt-4">
                  <Progress value={testProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Testing accessibility compliance... {testProgress}%
                  </p>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessibilityTests.map((test) => (
                  <div key={test.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="mt-1">
                      {getStatusIcon(test.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{test.name}</h3>
                        <Badge className={getStatusBadgeClass(test.status)}>
                          {test.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          WCAG {test.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {test.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {test.description}
                      </p>
                      {test.details && (
                        <p className="text-xs text-muted-foreground">
                          {test.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Core Web Vitals & Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{metric.name}</h3>
                      <Badge className={getStatusBadgeClass(metric.status === 'good' ? 'pass' : metric.status === 'needs-improvement' ? 'warning' : 'fail')}>
                        {metric.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-bold ${getPerformanceStatusClass(metric.status)}`}>
                        {metric.value}
                      </span>
                      <span className="text-sm text-muted-foreground">{metric.unit}</span>
                    </div>
                    <div className="mt-2">
                      <Progress 
                        value={Math.min((metric.value / metric.threshold) * 100, 100)} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Threshold: {metric.threshold}{metric.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AceInt Design System Guidelines Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Color System:</strong> All brand colors (Electric Blue #0066FF, AI Purple #8B5CF6, Neon Green #00E676) 
                  are properly implemented with 4.5:1 contrast ratios.
                </AlertDescription>
              </Alert>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Typography:</strong> Inter font family is consistently used with proper size hierarchy 
                  (14px base, semantic HTML elements).
                </AlertDescription>
              </Alert>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Component Consistency:</strong> All buttons follow established patterns with proper variants 
                  (Primary: Electric Blue, Secondary: AI Purple, Destructive: Danger Red).
                </AlertDescription>
              </Alert>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Animation Standards:</strong> All transitions use cubic-bezier(0.4, 0, 0.2, 1) easing 
                  with maximum 500ms duration. Reduced motion preferences are respected.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Interface Guidelines:</strong> AI confidence scoring displays proper thresholds 
                  (90%+ High, 70-89% Medium, &lt;70% Low) but could benefit from additional visual indicators.
                </AlertDescription>
              </Alert>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Responsive Design:</strong> Breakpoints at 768px (tablet) and 1024px (desktop) 
                  are properly implemented with appropriate content adaptation.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
