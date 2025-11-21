import React from 'react';
import { features } from '../../data/landingMock';
import { Cpu, GitMerge, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  GitMerge,
  ShieldCheck,
  Clock
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Deploy Faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to scale your engineering
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our AI agent handles the repetitive tasks, so you can focus on high-level architecture and business logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="rounded-lg bg-blue-50 p-3 mb-4">
                  <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8 text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
