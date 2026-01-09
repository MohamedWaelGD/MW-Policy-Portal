import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  highlight?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay = 0, highlight }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } }
      }}
      className="group relative p-6 h-full bg-surface/40 backdrop-blur-sm border border-white/5 rounded-xl hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center mb-4 text-white group-hover:scale-110 group-hover:border-primary/50 group-hover:text-primary transition-all duration-300">
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
          {title}
        </h3>
        
        <p className="text-sm text-zinc-400 leading-relaxed">
          {description}
        </p>

        {highlight && (
           <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    {highlight}
                </span>
           </div>
        )}
      </div>
    </motion.div>
  );
};