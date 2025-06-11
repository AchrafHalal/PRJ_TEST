import React, { useState, useEffect } from 'react';
import './StandaloneLandingPage.css';

const StandaloneLandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const testimonials = [
    {
      name: "Emma Wilson",
      role: "Small Business Owner",
      avatar: "EW",
      content: "FinanceTracker transformed how I manage both personal and business finances. The categorization is spot-on and saves me hours every month.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Financial Analyst",
      avatar: "DC",
      content: "As someone who works in finance, I'm impressed by the depth of insights. The AI recommendations have helped me optimize my investment strategy.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Teacher",
      avatar: "LR",
      content: "Simple enough for everyday use but powerful enough to help me reach my savings goals. I've recommended it to all my colleagues.",
      rating: 5
    }
  ];

  const services = [
    {
      icon: "👁️",
      title: "Track Your Expenses",
      description: "Automatically categorize and track every transaction. Never lose sight of where your money goes with our intelligent expense tracking system.",
      color: "blue"
    },
    {
      icon: "📅",
      title: "Monthly Budgeting Insights",
      description: "Get personalized budget recommendations based on your spending patterns. Set realistic goals and achieve them with smart notifications.",
      color: "green"
    },
    {
      icon: "📊",
      title: "Visual Financial Dashboard",
      description: "Beautiful charts and graphs that make understanding your finances simple. See trends, patterns, and opportunities at a glance.",
      color: "purple"
    },
    {
      icon: "🔒",
      title: "Secure & Private Data",
      description: "Your financial data is always protected and never shared with third parties.",
      color: "red"
    }
  ];

  const features = [
    {
      title: "AI-Powered Insights",
      description: "Our advanced AI analyzes your spending patterns and provides personalized recommendations to optimize your budget.",
      stat: "85% accuracy"
    },
    {
      title: "Real-time Sync",
      description: "Connect all your accounts and get real-time updates across all devices. Your data is always current and accessible.",
      stat: "99.9% uptime"
    },
    {
      title: "Expert Support",
      description: "Get help from certified financial advisors. Our support team is available 24/7 to help you achieve your goals.",
      stat: "< 2min response"
    }
  ];

  return (
    <div className="finance-landing-page">
      {/* Header */}
      <header className={`finance-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="finance-container">
          <div className="finance-header-content">
            <div className="finance-logo">
              <div className="finance-logo-icon">
                <span>F</span>
              </div>
              <span className="finance-logo-text">FinanceTracker</span>
            </div>
            
            <nav className="finance-nav">
              <button onClick={() => scrollToSection('features')} className="finance-nav-link">
                Features
              </button>
              <button onClick={() => scrollToSection('why-choose-us')} className="finance-nav-link">
                Why Us
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="finance-nav-link">
                Reviews
              </button>
              <a href="/login" className="finance-nav-link">
                Login
              </a>
              <a href="/register" className="finance-btn finance-btn-primary">
                Get Started
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="finance-hero">
        <div className="finance-hero-bg">
          <div className="finance-hero-decoration finance-hero-decoration-1"></div>
          <div className="finance-hero-decoration finance-hero-decoration-2"></div>
          <div className="finance-hero-decoration finance-hero-decoration-3"></div>
        </div>
        
        <div className="finance-container">
          <div className="finance-hero-content">
            
            
            <h1 className="finance-hero-title">
              Take Control of Your
              <span className="finance-hero-title-highlight">Financial Future</span>
            </h1>
            
            <p className="finance-hero-subtitle">
              Track expenses, create smart budgets, and get powerful insights into your financial health. 
              Start your journey to financial freedom today.
            </p>
            
            <div className="finance-hero-buttons">
              <a href="/register" className="finance-btn finance-btn-white">
                Start Tracking Free
              </a>
              <a href="/login" className="finance-btn finance-btn-outline">
                Already have an account? Log in
              </a>
            </div>
            
            <div className="finance-hero-stats">
              <p>Trusted by 50,000+ users worldwide</p>
              <div className="finance-stats-grid">
                <div className="finance-stat">
                  <div className="finance-stat-number">$2.5M+</div>
                  <div className="finance-stat-label">Money Tracked</div>
                </div>
                <div className="finance-stat">
                  <div className="finance-stat-number">15%</div>
                  <div className="finance-stat-label">Avg. Savings Increase</div>
                </div>
                <div className="finance-stat">
                  <div className="finance-stat-number">4.9★</div>
                  <div className="finance-stat-label">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="features" className="finance-services">
        <div className="finance-container">
          <div className="finance-section-header">
            <h2>Everything You Need to Manage Your Money</h2>
            <p>Powerful features designed to give you complete control over your financial life</p>
          </div>
          
          <div className="finance-services-grid">
            {services.map((service, index) => (
              <div key={index} className="finance-service-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`finance-service-icon finance-service-icon-${service.color}`}>
                  <span>{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="finance-why-choose">
        <div className="finance-container">
          <div className="finance-why-choose-grid">
            <div className="finance-why-choose-content">
              <h2>Why Choose FinanceTracker?</h2>
              <p className="finance-why-choose-subtitle">
                We're not just another finance app. We're your partner in building lasting financial success.
              </p>
              
              <div className="finance-features-list">
                {features.map((feature, index) => (
                  <div key={index} className="finance-feature-item">
                    <div className="finance-feature-number">
                      <span>{index + 1}</span>
                    </div>
                    <div className="finance-feature-content">
                      <div className="finance-feature-header">
                        <h3>{feature.title}</h3>
                        <span className="finance-feature-stat">{feature.stat}</span>
                      </div>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="finance-success-stories">
              <div className="finance-success-card">
                <h3>Success Stories</h3>
                
                <div className="finance-story">
                  <div className="finance-story-header">
                    <div className="finance-story-avatar">SA</div>
                    <div className="finance-story-info">
                      <div className="finance-story-name">Sarah Adams</div>
                      <div className="finance-story-role">Marketing Manager</div>
                    </div>
                  </div>
                  <p>"Increased my savings by 40% in just 6 months. The insights are incredible!"</p>
                </div>
                
                <div className="finance-story">
                  <div className="finance-story-header">
                    <div className="finance-story-avatar">MJ</div>
                    <div className="finance-story-info">
                      <div className="finance-story-name">Mike Johnson</div>
                      <div className="finance-story-role">Software Developer</div>
                    </div>
                  </div>
                  <p>"Finally understand where my money goes. Best financial decision I've made."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="finance-testimonials">
        <div className="finance-container">
          <div className="finance-section-header finance-section-header-dark">
            <h2>What Our Users Say</h2>
            <p>Join thousands of satisfied users who've taken control of their finances</p>
          </div>
          
          <div className="finance-testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="finance-testimonial-card">
                <div className="finance-testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                
                <p className="finance-testimonial-content">
                  "{testimonial.content}"
                </p>
                
                <div className="finance-testimonial-author">
                  <div className="finance-testimonial-avatar">
                    {testimonial.avatar}
                  </div>
                  <div className="finance-testimonial-info">
                    <div className="finance-testimonial-name">{testimonial.name}</div>
                    <div className="finance-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="finance-footer">
        <div className="finance-container">
          <div className="finance-footer-content">
            <div className="finance-footer-section">
              <div className="finance-footer-logo">
                <div className="finance-logo-icon">
                  <span>F</span>
                </div>
                <span className="finance-logo-text">FinanceTracker</span>
              </div>
              <p>Empowering individuals to take control of their financial future with intelligent tracking and insights.</p>
              <div className="finance-social-links">
                <a href="#" className="finance-social-link">📱</a>
                <a href="#" className="finance-social-link">🐦</a>
                <a href="#" className="finance-social-link">💼</a>
              </div>
            </div>
            
            <div className="finance-footer-section">
              <h3>Product</h3>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
            
            <div className="finance-footer-section">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            
            <div className="finance-footer-section">
              <h3>Legal</h3>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="finance-footer-bottom">
            <p>© 2024 FinanceTracker. All rights reserved. Built with ❤️ for financial freedom.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StandaloneLandingPage;