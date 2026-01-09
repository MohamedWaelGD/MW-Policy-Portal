import React from 'react';
import { Clock, CheckCircle2, XCircle, ChevronRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const requests = [
  { id: 1, title: 'New MacBook Pro M3', status: 'Approved', days: '2m ago', type: 'Equipment' },
  { id: 2, title: 'Q3 Offsite - NYC', status: 'Pending', days: '2d ago', type: 'Travel' },
  { id: 3, title: 'Figma Enterprise Lic', status: 'Rejected', days: '5d ago', type: 'Software' },
];

export const DashboardPreview: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto transform hover:rotate-0 transition-transform duration-500 rotate-1">
      {/* Mobile Frame */}
      <div className="rounded-[2.5rem] bg-black border-[6px] border-zinc-800 shadow-2xl overflow-hidden h-[500px] relative">
        {/* Dynamic Island Area */}
        <div className="absolute top-0 w-full h-8 bg-black z-20 flex justify-center">
            <div className="w-24 h-5 bg-zinc-900 rounded-b-xl"></div>
        </div>

        {/* App Content */}
        <div className="bg-surface h-full w-full pt-10 px-5 flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white">My Requests</h2>
                    <p className="text-xs text-zinc-500">3 active items</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Filter size={14} className="text-zinc-400" />
                </div>
            </div>

            {/* List */}
            <div className="space-y-3">
                {requests.map((req, i) => (
                    <motion.div 
                        key={req.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        className="bg-[#18181b] p-3 rounded-xl border border-white/5 flex items-center gap-3 hover:bg-zinc-800/50 transition-colors cursor-pointer group"
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            req.status === 'Approved' ? 'bg-green-500/10 text-green-500' :
                            req.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                            'bg-red-500/10 text-red-500'
                        }`}>
                            {req.status === 'Approved' && <CheckCircle2 size={18} />}
                            {req.status === 'Pending' && <Clock size={18} />}
                            {req.status === 'Rejected' && <XCircle size={18} />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate">{req.title}</h4>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-0.5">
                                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">{req.type}</span>
                                <span>• {req.days}</span>
                            </div>
                        </div>

                        <ChevronRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                    </motion.div>
                ))}
            </div>

            {/* Floating Action Button */}
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute bottom-6 right-6 w-12 h-12 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-white cursor-pointer hover:bg-primary-dark transition-colors"
            >
                <span className="text-2xl font-light leading-none mb-1">+</span>
            </motion.div>
        </div>
      </div>
    </div>
  );
};