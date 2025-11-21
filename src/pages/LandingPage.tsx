import React from 'react';
import { Hero } from '../components/landing/Hero';
import { HeroGallery } from '../components/landing/HeroGallery';
import { Features } from '../components/landing/Features';
import { SignupForm } from '../components/landing/SignupForm';
import { Footer } from '../components/landing/Footer';

export const LandingPage: React.FC = () => {
  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <nav className="absolute top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl tracking-tight text-slate-900">Agent<span className="text-blue-600">X</span></span>
            </div>
            <div className="hidden md:block">
              <button 
                onClick={scrollToSignup}
                className="text-sm font-semibold leading-6 text-slate-900 hover:text-blue-600 transition-colors"
              >
                Get Early Access
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Hero onSignupClick={scrollToSignup} />
        <HeroGallery />
        <Features />
        <SignupForm />
      </main>

      <Footer />
    </div>
  );
};
