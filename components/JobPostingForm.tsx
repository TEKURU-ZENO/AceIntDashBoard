import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Brain, 
  DollarSign, 
  MapPin, 
  Users, 
  Clock, 
  Sparkles,
  AlertCircle,
  CheckCircle,
  Loader2,
  Wand2
} from 'lucide-react';

interface FormData {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  minSalary: string;
  maxSalary: string;
  aiScreening: boolean;
  urgencyLevel: string;
}

interface AIInsight {
  type: 'suggestion' | 'warning' | 'enhancement';
  message: string;
  confidence: number;
}

const initialFormData: FormData = {
  title: '',
  department: '',
  location: '',
  type: '',
  description: '',
  requirements: '',
  minSalary: '',
  maxSalary: '',
  aiScreening: false,
  urgencyLevel: 'medium'
};

export function JobPostingForm({ onSubmit, onCancel }: { 
  onSubmit: (data: FormData) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [completionScore, setCompletionScore] = useState(0);

  // Calculate form completion percentage
  React.useEffect(() => {
    const filledFields = Object.values(formData).filter(value => value !== '' && value !== false).length;
    const totalFields = Object.keys(formData).length - 1; // Exclude aiScreening from count
    setCompletionScore(Math.round((filledFields / totalFields) * 100));
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Required field validation following guidelines
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.type) newErrors.type = 'Employment type is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Requirements are required';

    // Salary validation
    if (formData.minSalary && formData.maxSalary) {
      const min = parseInt(formData.minSalary.replace(/[^\d]/g, ''));
      const max = parseInt(formData.maxSalary.replace(/[^\d]/g, ''));
      if (min >= max) {
        newErrors.maxSalary = 'Maximum salary must be higher than minimum';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateAIInsights = async () => {
    setIsGeneratingAI(true);
    
    // Simulate AI analysis - following guidelines for AI features
    setTimeout(() => {
      const insights: AIInsight[] = [
        {
          type: 'suggestion',
          message: 'Consider adding "React" and "TypeScript" as specific requirements to attract qualified candidates.',
          confidence: 89
        },
        {
          type: 'enhancement',
          message: 'The salary range is competitive for this role in the specified location.',
          confidence: 92
        },
        {
          type: 'warning',
          message: 'Job description may benefit from more specific technical requirements.',
          confidence: 76
        }
      ];
      
      setAIInsights(insights);
      setIsGeneratingAI(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatSalary = (value: string) => {
    const number = value.replace(/[^\d]/g, '');
    if (number) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(parseInt(number));
    }
    return '';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Form Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Create New Job Posting</CardTitle>
              <p className="text-muted-foreground mt-1">
                Fill out the details below to create your job posting
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-2">Form Completion</div>
              <div className="flex items-center gap-2">
                <Progress value={completionScore} className="w-24" />
                <span className="text-sm font-medium">{completionScore}%</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-electric-blue" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Job Title <span className="text-danger-red">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g. Senior Frontend Developer"
                      className={errors.title ? 'border-danger-red focus:border-danger-red' : ''}
                      aria-describedby={errors.title ? 'title-error' : undefined}
                    />
                    {errors.title && (
                      <p id="title-error" className="text-sm text-danger-red" role="alert">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">
                      Department <span className="text-danger-red">*</span>
                    </Label>
                    <Select 
                      value={formData.department} 
                      onValueChange={(value) => handleInputChange('department', value)}
                    >
                      <SelectTrigger 
                        className={errors.department ? 'border-danger-red' : ''}
                        aria-describedby={errors.department ? 'department-error' : undefined}
                      >
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.department && (
                      <p id="department-error" className="text-sm text-danger-red" role="alert">
                        {errors.department}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-danger-red">*</span>
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="e.g. San Francisco, CA or Remote"
                      className={errors.location ? 'border-danger-red focus:border-danger-red' : ''}
                      aria-describedby={errors.location ? 'location-error' : undefined}
                    />
                    {errors.location && (
                      <p id="location-error" className="text-sm text-danger-red" role="alert">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">
                      Employment Type <span className="text-danger-red">*</span>
                    </Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => handleInputChange('type', value)}
                    >
                      <SelectTrigger 
                        className={errors.type ? 'border-danger-red' : ''}
                        aria-describedby={errors.type ? 'type-error' : undefined}
                      >
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p id="type-error" className="text-sm text-danger-red" role="alert">
                        {errors.type}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-ai-purple" />
                  Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Job Description <span className="text-danger-red">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
                    rows={6}
                    className={errors.description ? 'border-danger-red focus:border-danger-red' : ''}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                  />
                  {errors.description && (
                    <p id="description-error" className="text-sm text-danger-red" role="alert">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">
                    Requirements <span className="text-danger-red">*</span>
                  </Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    placeholder="List the required skills, experience, and qualifications..."
                    rows={4}
                    className={errors.requirements ? 'border-danger-red focus:border-danger-red' : ''}
                    aria-describedby={errors.requirements ? 'requirements-error' : undefined}
                  />
                  {errors.requirements && (
                    <p id="requirements-error" className="text-sm text-danger-red" role="alert">
                      {errors.requirements}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Compensation & Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-neon-green" />
                  Compensation & Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minSalary">Minimum Salary</Label>
                    <Input
                      id="minSalary"
                      value={formData.minSalary}
                      onChange={(e) => handleInputChange('minSalary', formatSalary(e.target.value))}
                      placeholder="$80,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxSalary">Maximum Salary</Label>
                    <Input
                      id="maxSalary"
                      value={formData.maxSalary}
                      onChange={(e) => handleInputChange('maxSalary', formatSalary(e.target.value))}
                      placeholder="$120,000"
                      className={errors.maxSalary ? 'border-danger-red focus:border-danger-red' : ''}
                      aria-describedby={errors.maxSalary ? 'maxSalary-error' : undefined}
                    />
                    {errors.maxSalary && (
                      <p id="maxSalary-error" className="text-sm text-danger-red" role="alert">
                        {errors.maxSalary}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgencyLevel">Priority Level</Label>
                  <Select 
                    value={formData.urgencyLevel} 
                    onValueChange={(value) => handleInputChange('urgencyLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-ai-purple" />
                      <Label htmlFor="aiScreening" className="font-medium">
                        Enable AI Screening
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically screen candidates using AI-powered analysis
                    </p>
                  </div>
                  <Switch
                    id="aiScreening"
                    checked={formData.aiScreening}
                    onCheckedChange={(checked) => handleInputChange('aiScreening', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSubmit}
                >
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  className="bg-electric-blue hover:bg-electric-blue/90"
                >
                  Post Job
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-ai-purple" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={generateAIInsights}
                disabled={isGeneratingAI || !formData.title || !formData.description}
                className="w-full bg-ai-purple hover:bg-ai-purple/90"
              >
                {isGeneratingAI ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate AI Insights
                  </>
                )}
              </Button>

              {aiInsights.length > 0 && (
                <div className="space-y-3">
                  <Separator />
                  {aiInsights.map((insight, index) => (
                    <Alert key={index} className="border-l-4 border-l-ai-purple">
                      <div className="flex items-start gap-2">
                        {insight.type === 'warning' ? (
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                        ) : insight.type === 'enhancement' ? (
                          <CheckCircle className="h-4 w-4 text-neon-green mt-0.5" />
                        ) : (
                          <Brain className="h-4 w-4 text-ai-purple mt-0.5" />
                        )}
                        <div className="flex-1">
                          <AlertDescription className="text-sm">
                            {insight.message}
                          </AlertDescription>
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs text-muted-foreground">
                              AI Confidence:
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                insight.confidence >= 90 
                                  ? 'border-neon-green text-neon-green' 
                                  : insight.confidence >= 70 
                                  ? 'border-ai-purple text-ai-purple'
                                  : 'border-orange-500 text-orange-500'
                              }`}
                            >
                              {insight.confidence}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Alert>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </card>
      </div>
    </div>
  </div>
  );
}
