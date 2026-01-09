import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Bell, LayoutGrid, Eye, Clock, ShieldCheck, PlayCircle, Menu } from 'lucide-react';
import { WorkflowVisualizer } from './components/WorkflowVisualizer';
import { DashboardPreview } from './components/RequestPreview';
import { FeatureCard } from './components/FeatureCard';

interface LandingPageProps {
  onNavigate: (page: 'auth') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-6"
    >
      {/* --- Navbar --- */}
      <motion.nav variants={itemVariants} className="flex justify-between items-center py-6 mb-16 md:mb-24">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <ShieldCheck size={18} className="text-white" />
            </div>
            <span className="font-semibold tracking-tight text-xl text-white">MW Policy<span className="text-zinc-500 font-normal">Portal</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">How it works</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>
        <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('auth')}
              className="hidden md:block text-sm font-medium text-zinc-300 hover:text-white"
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigate('auth')}
              className="h-9 px-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
            >
                Get Started
            </button>
        </div>
      </motion.nav>

      {/* --- Hero Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
        <div className="text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                New: Mobile Approvals
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
              Skip the paperwork. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">Track the progress.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg text-zinc-400 mb-8 leading-relaxed max-w-lg">
              The simplest way to submit, manage, and track your organizational policy requests. From travel expenses to equipment upgrades, do it all in one place.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('auth')}
                className="h-12 px-8 rounded-full bg-primary hover:bg-primary-dark text-white font-medium transition-all shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 group"
              >
                Submit Request <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="h-12 px-8 rounded-full border border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-center gap-2">
                <PlayCircle size={18} /> How it works
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-4 text-sm text-zinc-500">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-700"></div>
                    <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-600"></div>
                </div>
                <p>Trusted by 500+ employees</p>
            </motion.div>
        </div>

        <motion.div variants={itemVariants} className="relative lg:h-[600px] flex items-center justify-center">
             {/* Visualizer Background Glow */}
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-30 rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
             <WorkflowVisualizer />
        </motion.div>
      </div>

      {/* --- Benefits Section --- */}
      <motion.section variants={itemVariants} className="mb-32">
        <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-white">Everything you need to get to "Yes"</h2>
            <p className="text-zinc-400">Stop chasing managers for approvals. We handle the follow-up so you can focus on your work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <FeatureCard 
                title="Real-Time Transparency"
                description="See exactly whose desk your request is sitting on. No more black holes."
                icon={<Eye size={20} />}
             />
             <FeatureCard 
                title="Instant Notifications"
                description="Get alerted via Slack or Email the second a decision is made on your request."
                icon={<Bell size={20} />}
             />
             <FeatureCard 
                title="Centralized Hub"
                description="All your past approvals, documents, and receipts in one secure searchable dashboard."
                icon={<LayoutGrid size={20} />}
             />
             <FeatureCard 
                title="Automated Reminders"
                description="The system politely nudges approvers if a request has been sitting for more than 24 hours."
                icon={<Clock size={20} />}
             />
        </div>
      </motion.section>

      {/* --- Mobile App Section --- */}
      <motion.section variants={itemVariants} className="bg-surface/30 border border-white/5 rounded-3xl p-8 md:p-20 overflow-hidden relative">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
                <DashboardPreview />
            </div>
            <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Your office in your pocket.</h2>
                <div className="space-y-6 text-zinc-400 text-lg">
                    <p>
                        Need to approve a request while grabbing coffee? The MW Policy Portal is fully optimized for mobile devices.
                    </p>
                    <ul className="space-y-4 mt-4">
                        <li className="flex items-center gap-3 text-white">
                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                <ArrowRight size={14} className="text-indigo-400" />
                            </div>
                            One-tap approvals
                        </li>
                        <li className="flex items-center gap-3 text-white">
                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                <ArrowRight size={14} className="text-indigo-400" />
                            </div>
                            Upload receipts from camera
                        </li>
                        <li className="flex items-center gap-3 text-white">
                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                <ArrowRight size={14} className="text-indigo-400" />
                            </div>
                            Dark mode support
                        </li>
                    </ul>
                </div>
            </div>
         </div>
      </motion.section>

      {/* --- Footer / CTA --- */}
      <motion.section variants={itemVariants} className="mt-32 text-center pb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready to simplify your workday?</h2>
        <button className="h-14 px-10 rounded-full bg-white text-black text-lg font-semibold hover:bg-zinc-200 transition-colors shadow-xl shadow-white/10">
            Get Started with MW Policy Portal
        </button>
        <p className="mt-8 text-zinc-500 text-sm">
            © 2024 MW Policy Portal. Internal Use Only. <br/>
            Need help? Contact <a href="#" className="text-primary hover:underline">IT Support</a>.
        </p>
      </motion.section>

    </motion.div>
  );
};

export default LandingPage;