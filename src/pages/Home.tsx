import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Menu, X, Star, Play, ArrowRight, ChevronLeft, ChevronRight, Target, BarChart3, Users, Check, Globe, Award, Shield, Lightbulb, TrendingUp, Puzzle, Zap, Twitter, Facebook, Instagram, Linkedin, UserPlus, Settings, Rocket, MessageSquare, Calendar, Repeat, FileText, Brain, Chrome } from 'lucide-react';
import { XIcon, LinkedInIcon } from '@/components/ui/social-icons';
import { Features } from '@/components/ui/features-8';
import { AuthModal } from '@/components/ui/auth-modal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signup' | 'signin' }>({
    isOpen: false,
    mode: 'signup'
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  // Toggle between X and LinkedIn logos every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLinkedIn(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const carouselItems = [
    { title: "Boost Productivity", description: "Increase your daily output by 300%" },
    { title: "Smart Analytics", description: "Track and optimize your performance" },
    { title: "Team Collaboration", description: "Work seamlessly with your team" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const steps = [
    {
      number: 1,
      title: "Connect Your Account",
      description: "Link your X or LinkedIn account to Postify in just a click and get ready to automate your content game.",
      icon: <UserPlus className="h-8 w-8 text-orange-500" />
    },
    {
      number: 2,
      title: "Customize Your Strategy",
      description: "Set up your Postify profile based on your personal goals — whether it's visibility, engagement, or growth.",
      icon: <Settings className="h-8 w-8 text-orange-500" />
    },
    {
      number: 3,
      title: "Activate Growth Mode",
      description: "You're all set! Start exploring Postify's full toolkit and turn your X and LinkedIn into a growth engine.",
      icon: <Rocket className="h-8 w-8 text-orange-500" />
    }
  ];

  // Static heatmap pattern - no more random generation
  const heatmapPattern = [
    'bg-orange-500', 'bg-orange-300', 'bg-orange-100', 'bg-gray-100', 'bg-orange-500', 'bg-orange-300', 'bg-orange-500',
    'bg-orange-300', 'bg-orange-500', 'bg-orange-100', 'bg-orange-300', 'bg-gray-100', 'bg-orange-500', 'bg-orange-100',
    'bg-orange-100', 'bg-orange-300', 'bg-orange-500', 'bg-orange-300', 'bg-orange-100', 'bg-gray-100', 'bg-orange-300',
    'bg-gray-100', 'bg-orange-500', 'bg-orange-300', 'bg-orange-500', 'bg-orange-100', 'bg-orange-300', 'bg-orange-500',
    'bg-orange-300', 'bg-orange-100', 'bg-gray-100', 'bg-orange-500', 'bg-orange-300', 'bg-orange-100', 'bg-orange-500'
  ];

  /**
   * Handle opening authentication modal
   */
  const handleAuthClick = (mode: 'signup' | 'signin') => {
    setAuthModal({ isOpen: true, mode });
  };

  /**
   * Handle closing authentication modal
   */
  const handleAuthClose = () => {
    setAuthModal({ isOpen: false, mode: 'signup' });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header Navigation */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center mt-2">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 text-gray-700">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 mx-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">Features</a>
              <a href="#solutions" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">Solutions</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">FAQ</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm">Pricing</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <Button 
                onClick={() => handleAuthClick('signup')}
                className="relative bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium text-sm h-8 transition-all duration-300 group overflow-hidden"
                style={{
                  boxShadow: `
                    0 0 15px rgba(249, 115, 22, 0.4),
                    0 0 30px rgba(249, 115, 22, 0.3),
                    0 0 45px rgba(249, 115, 22, 0.2),
                    0 0 60px rgba(249, 115, 22, 0.1),
                    0 0 75px rgba(249, 115, 22, 0.05)
                  `
                }}
              >
                {/* Animated glow rings */}
                <div className="absolute inset-0 rounded-full bg-orange-500 opacity-75 animate-ping" style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-0 rounded-full bg-orange-400 opacity-50 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
                <div className="absolute inset-0 rounded-full bg-orange-300 opacity-25 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-80 blur-sm"></div>
                
                {/* Button content */}
                <span className="relative z-10">
                  Get started
                </span>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-300 to-orange-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-8 w-8"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg">
            <div className="px-6 py-4">
              <nav className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Features</a>
                <a href="#solutions" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Solutions</a>
                <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">FAQ</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Pricing</a>
                <Button 
                  onClick={() => handleAuthClick('signup')}
                  className="relative bg-orange-500 hover:bg-orange-600 text-white w-full rounded-full text-sm h-8 mt-2 transition-all duration-300 group overflow-hidden"
                  style={{
                    boxShadow: `
                      0 0 15px rgba(249, 115, 22, 0.4),
                      0 0 30px rgba(249, 115, 22, 0.3),
                      0 0 45px rgba(249, 115, 22, 0.2),
                      0 0 60px rgba(249, 115, 22, 0.1),
                      0 0 75px rgba(249, 115, 22, 0.05)
                    `
                  }}
                >
                  {/* Animated glow rings */}
                  <div className="absolute inset-0 rounded-full bg-orange-500 opacity-75 animate-ping" style={{ animationDuration: '2s' }}></div>
                  <div className="absolute inset-0 rounded-full bg-orange-400 opacity-50 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
                  <div className="absolute inset-0 rounded-full bg-orange-300 opacity-25 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                  
                  {/* Inner glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-80 blur-sm"></div>
                  
                  {/* Button content */}
                  <span className="relative z-10">
                    Get started
                  </span>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-300 to-orange-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </Button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gray-50 py-20 sm:py-32 pt-28">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-90">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(156, 163, 175, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(156, 163, 175, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative">
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              {/* Left Dashboard - Moved further left */}
              <div className="lg:col-span-3 hidden lg:block space-y-12 -ml-8">
                {/* Consistency Card - Enlarged, Tilted, and Positioned */}
                <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-[+8deg] scale-100 -translate-x-20 -translate-y-4 relative z-20 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Consistency</h3>
                  <p className="text-base text-gray-600 mb-6">Current streak: 201 days</p>
                  
                  {/* Static Heatmap Grid */}
                  <div className="grid grid-cols-7 gap-1.5 mb-6">
                    {heatmapPattern.map((colorClass, i) => (
                      <div 
                        key={i} 
                        className={`w-5 h-5 rounded-sm ${colorClass}`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-6">
                    <span>Dec</span>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Less</span>
                    <span>More</span>
                  </div>
                </div>

                {/* New Followers Card */}
                <div className="bg-white rounded-2xl shadow-lg p-3 rotate-[-8deg] -translate-x-4">
                  <p className="text-sm text-gray-600 mb-2">New followers</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">1.8K</span>
                    <span className="ml-2 text-sm text-green-500 font-medium">↗ 18%</span>
                  </div>
                </div>
              </div>

              {/* Center Content - Added more margin */}
              <div className="lg:col-span-6 text-center mt-16 px-8">
                <div className="mx-auto max-w-4xl">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    Turn Your{' '}
                    <span className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white rounded-2xl mx-2 align-middle transition-all duration-300 ease-in-out ${
                      showLinkedIn ? 'bg-[#0077B5]' : 'bg-black'
                    }`}>
                      {showLinkedIn ? (
                        <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                      ) : (
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                      )}
                    </span>{' '}
                    into a Growth Machine
                  </h1>
                  
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    One Tool. Endless Content. All Automated with AI.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => handleAuthClick('signup')}
                      size="lg" 
                      className="relative bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-full font-medium shadow-lg transition-all duration-300 group overflow-hidden"
                      style={{
                        boxShadow: `
                          0 0 20px rgba(249, 115, 22, 0.4),
                          0 0 40px rgba(249, 115, 22, 0.3),
                          0 0 60px rgba(249, 115, 22, 0.2),
                          0 0 80px rgba(249, 115, 22, 0.1),
                          0 0 100px rgba(249, 115, 22, 0.05)
                        `
                      }}
                    >
                      {/* Animated glow rings */}
                      <div className="absolute inset-0 rounded-full bg-orange-500 opacity-75 animate-ping" style={{ animationDuration: '2s' }}></div>
                      <div className="absolute inset-0 rounded-full bg-orange-400 opacity-50 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
                      <div className="absolute inset-0 rounded-full bg-orange-300 opacity-25 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                      
                      {/* Inner glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-80 blur-sm"></div>
                      
                      {/* Button content */}
                      <span className="relative z-10 flex items-center">
                        Try for Free
                      </span>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-300 to-orange-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </Button>
                    <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 px-8 py-4 text-lg rounded-full font-medium">
                      <Play className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Dashboard - Moved further right */}
              <div className="lg:col-span-3 hidden lg:block space-y-12 -mr-8">
                {/* Likes Chart Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 rotate-[-8deg] translate-x-20 scale-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Likes</h3>
                    <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded">Average 57%</span>
                  </div>
                  
                  {/* Chart Area with proper spacing */}
                  <div className="h-32 relative mb-4 pl-8">
                    <svg className="w-full h-full" viewBox="0 0 300 120">
                      <path
                        d="M 20 80 Q 70 60 120 70 T 220 50 T 300 60"
                        stroke="#FF5C00"
                        strokeWidth="3"
                        fill="none"
                        className="drop-shadow-sm"
                      />
                      <circle cx="270" cy="39" r="4" fill="#FF5C00" />
                    </svg>
                    
                    {/* Y-axis labels with proper positioning */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-2">
                      <span>8000</span>
                      <span>6000</span>
                      <span>4000</span>
                      <span>2000</span>
                    </div>
                  </div>
                  
                  {/* X-axis labels */}
                  <div className="flex justify-between text-xs text-gray-400 pl-8">
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                    <span>Jan</span>
                    <span>Feb</span>
                  </div>
                </div>

                {/* Optimized Reach Card */}
                <div className="bg-white rounded-2xl shadow-lg p-3 rotate-[+8deg] translate-x-4">
                  <p className="text-sm text-gray-600 mb-2">Optimized Reach</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">0.9k</span>
                    <span className="ml-2 text-sm text-green-500 font-medium">↗ 9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive How it Works Section */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-lg text-gray-600 mb-4 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              In 3 Simple Steps
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How it Works
            </h2>
          </div>

          {/* Interactive Steps Container */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg grid md:grid-cols-2 gap-12 items-start">
              {/* Left side - Vertical Step Navigation */}
              <div className="space-y-6">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`flex items-start space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeStep === step.number
                        ? 'bg-orange-50 border-l-4 border-orange-500'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveStep(step.number)}
                  >
                    {/* Step Number */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 flex-shrink-0 ${
                        activeStep === step.number
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.number}
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                        activeStep === step.number ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm transition-colors duration-300 ${
                        activeStep === step.number ? 'text-gray-600' : 'text-gray-500'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right side - Visual */}
              <div className="flex justify-center items-center mt-16">
                <div className="w-80 h-80 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Puzzle piece visual for step 1 */}
                  {activeStep === 1 && (
                    <div className="w-32 h-32 bg-orange-500 rounded-2xl relative transition-all duration-500 ease-in-out">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-500 rounded-full"></div>
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-orange-500 rounded-full"></div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full"></div>
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>
                    </div>
                  )}
                  
                  {/* Settings gear visual for step 2 */}
                  {activeStep === 2 && (
                    <div className="relative transition-all duration-500 ease-in-out">
                      <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
                        <Settings className="h-12 w-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-300 rounded-full"></div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-300 rounded-full"></div>
                    </div>
                  )}
                  
                  {/* Rocket visual for step 3 */}
                  {activeStep === 3 && (
                    <div className="relative transition-all duration-500 ease-in-out">
                      <div className="w-20 h-32 bg-orange-500 rounded-t-full rounded-b-lg flex items-center justify-center">
                        <Rocket className="h-16 w-16 text-white" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-300 rounded-full animate-pulse"></div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-200 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section - Using the new component */}
      <Features />

      {/* Potential Unlock Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="border-2 border-orange-200 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
                Unlock Your Hidden Potential
              </h2>
              
              <div className="space-y-8">
                {[
                  {
                    icon: <Lightbulb className="h-8 w-8 text-orange-500" />,
                    title: "AI-Powered Insights",
                    description: "Discover patterns in your work habits and get personalized recommendations to boost efficiency."
                  },
                  {
                    icon: <Shield className="h-8 w-8 text-orange-500" />,
                    title: "Privacy-First Approach",
                    description: "Your data stays secure with end-to-end encryption and no third-party data sharing.",
                    hasAvatar: true
                  },
                  {
                    icon: <Award className="h-8 w-8 text-orange-500" />,
                    title: "Proven Results",
                    description: "Join thousands of professionals who've increased their productivity by an average of 40%."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start text-left space-x-4">
                    <div className="p-3 bg-orange-100 rounded-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      {item.hasAvatar && (
                        <div className="flex items-center mt-3">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                            alt="User testimonial"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">Alex Chen</p>
                            <p className="text-gray-500">Product Manager</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Join Thousands Who Trust Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our users are saying about their productivity transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "This extension completely transformed how I work. I'm 3x more productive and finally hitting all my deadlines consistently.",
                name: "Sarah Johnson",
                title: "Marketing Director",
                company: "TechCorp",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
                rating: 5
              },
              {
                quote: "The AI insights are incredible. It's like having a personal productivity coach that knows exactly what I need to improve.",
                name: "Michael Rodriguez",
                title: "Software Engineer",
                company: "StartupXYZ",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
                rating: 5
              },
              {
                quote: "Our entire team uses this now. The collaboration features make it so easy to stay aligned and track progress together.",
                name: "Emily Davis",
                title: "Team Lead",
                company: "InnovateCo",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade when you're ready to unlock advanced features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Free Plan</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  $0<span className="text-lg font-normal text-gray-600">/mo</span>
                </div>
                <p className="text-gray-600">Perfect for getting started</p>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4 mb-8">
                  {[
                    "Basic productivity tracking",
                    "Up to 3 goals",
                    "Weekly reports",
                    "Chrome extension",
                    "Community support"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => handleAuthClick('signup')}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="bg-white border-2 border-orange-500 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white px-4 py-1 text-sm">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center p-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Premium Plan</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  $9<span className="text-lg font-normal text-gray-600">/mo</span>
                </div>
                <p className="text-gray-600">Everything you need to excel</p>
              </CardHeader>
              <CardContent className="p-8">
                <ul className="space-y-4 mb-8">
                  {[
                    "Advanced AI insights",
                    "Unlimited goals",
                    "Daily reports & analytics",
                    "All browser extensions",
                    "Team collaboration",
                    "Priority support",
                    "Custom integrations",
                    "Advanced automation"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => handleAuthClick('signup')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                >
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our productivity extension
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How does the browser extension work?",
                  answer: "Our extension integrates seamlessly with your browser to track your productivity patterns, analyze your work habits, and provide personalized insights. It runs quietly in the background without affecting your browsing experience."
                },
                {
                  question: "Is my data secure and private?",
                  answer: "Absolutely. We use end-to-end encryption to protect your data, and we never share your personal information with third parties. All data processing happens locally on your device whenever possible."
                },
                {
                  question: "Can I use this with my team?",
                  answer: "Yes! Our Premium plan includes team collaboration features that allow you to share dashboards, track team goals, and collaborate on projects while maintaining individual privacy settings."
                },
                {
                  question: "Which browsers are supported?",
                  answer: "We support Chrome, Firefox, Safari, and Edge. The extension works identically across all platforms, and you can sync your data between different browsers."
                },
                {
                  question: "Can I cancel my subscription anytime?",
                  answer: "Yes, you can cancel your Premium subscription at any time. You'll continue to have access to Premium features until the end of your current billing period, then automatically switch to the free plan."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-orange-500 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            {/* Left side - Company info */}
            <div className="mb-8 lg:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-8 w-8 text-white" />
                <span className="text-xl font-bold">ProductiveX</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Transform your productivity with AI-powered insights and smart automation.
              </p>
              
              {/* Company Links */}
              <div className="flex flex-wrap gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            {/* Right side - Social media and brand symbol */}
            <div className="flex flex-col items-start lg:items-end">
              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-6">
                <XIcon className="w-10 h-10" />
                <LinkedInIcon className="w-10 h-10" />
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

              {/* Brand Symbol */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 ProductiveX. All rights reserved. Made with ❤️ for productive people.
            </p>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={authModal.isOpen}
        onClose={handleAuthClose}
        mode={authModal.mode}
      />
    </div>
  );
}