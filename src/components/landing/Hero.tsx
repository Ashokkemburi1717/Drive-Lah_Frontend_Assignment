import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onSignupClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSignupClick }) => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl"
        >
          The AI Coding Agent for{' '}
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative">SaaS Founders</span>
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700"
        >
          Accelerate your product launch. Build, deploy, and scale your SaaS with an intelligent coding partner that understands your business logic.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex justify-center gap-x-6"
        >
          <button
            onClick={onSignupClick}
            className="group inline-flex items-center justify-center rounded-full py-3 px-8 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900 transition-all duration-200"
          >
            Join the Waitlist
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a
            href="#features"
            className="group inline-flex ring-1 ring-slate-200 items-center justify-center rounded-full py-3 px-8 text-sm font-semibold focus:outline-none bg-white text-slate-900 hover:bg-slate-50 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 transition-all duration-200"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
};
