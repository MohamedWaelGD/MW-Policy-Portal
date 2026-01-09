import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Send, User } from 'lucide-react';

const timelineEvents = [
  { id: 1, title: 'Request Sent', time: '10:00 AM', icon: Send },
  { id: 2, title: 'Manager Review', time: '10:15 AM', icon: User },
  { id: 3, title: 'Approved', time: '10:42 AM', icon: Check },
];

export const WorkflowVisualizer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % (timelineEvents.length + 2)); // Add pause at end
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const displayStep = Math.min(currentStep, timelineEvents.length - 1);

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="bg-surface/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Decorative Header */}
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">Travel to San Francisco</span>
                <span className="text-xs text-zinc-500">REQ-2024-891 • $1,200.00</span>
            </div>
            <div className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                Business Trip
            </div>
        </div>

        {/* Timeline */}
        <div className="relative pl-4 space-y-8">
            {/* Vertical Line */}
            <div className="absolute left-[27px] top-2 bottom-4 w-0.5 bg-zinc-800" />
            
            {/* Animated Progress Line */}
            <motion.div 
                className="absolute left-[27px] top-2 w-0.5 bg-gradient-to-b from-indigo-500 to-violet-500 origin-top"
                initial={{ height: 0 }}
                animate={{ height: `${(displayStep / (timelineEvents.length - 1)) * 80}%` }}
                transition={{ duration: 0.5 }}
            />

            {timelineEvents.map((event, index) => {
                const isActive = index <= displayStep;
                const isCurrent = index === displayStep;
                
                return (
                    <div key={event.id} className="relative flex items-center gap-4 z-10">
                        <motion.div 
                            initial={false}
                            animate={{ 
                                backgroundColor: isActive ? '#6366f1' : '#18181b',
                                borderColor: isActive ? '#818cf8' : '#27272a',
                                scale: isCurrent ? 1.1 : 1
                            }}
                            className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 shadow-lg transition-colors duration-500"
                        >
                            {isActive ? (
                                <Check size={12} className="text-white" strokeWidth={3} />
                            ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                            )}
                        </motion.div>
                        
                        <div className="flex-1 flex justify-between items-center">
                            <span className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                                {event.title}
                            </span>
                            <span className={`text-xs font-mono transition-colors duration-300 ${isActive ? 'text-indigo-300' : 'text-zinc-600'}`}>
                                {isActive ? event.time : '--:--'}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>

        {/* Success Pop (Only when done) */}
        <AnimatePresence>
            {currentStep >= timelineEvents.length - 1 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-indigo-900/90 backdrop-blur-sm flex items-center justify-center flex-col z-20"
                >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-xl shadow-indigo-500/20">
                        <Check size={32} className="text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Request Approved!</h3>
                    <p className="text-indigo-200 text-sm mt-1">Notification sent to your email.</p>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};