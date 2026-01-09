import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Filter, 
  MoreHorizontal, 
  FileText, 
  CheckCircle2, 
  Archive, 
  AlertCircle, 
  X, 
  ArrowRight
} from 'lucide-react';

const MOCK_POLICIES = [
  { id: 1, name: 'Travel Expenses', description: 'Guidelines for domestic and international travel reimbursement limits.', author: 'Sarah J.', date: 'Oct 24, 2023', status: 'active' },
  { id: 2, name: 'Remote Work', description: 'Hybrid work policy including equipment stipends and core hours.', author: 'Mike T.', date: 'Nov 12, 2023', status: 'active' },
  { id: 3, name: 'Equipment Procurement', description: 'Process for requesting new hardware and software licenses.', author: 'Sarah J.', date: 'Dec 01, 2023', status: 'inactive' },
  { id: 4, name: 'Code of Conduct', description: 'Behavioral expectations and conflict resolution procedures.', author: 'HR Team', date: 'Jan 15, 2024', status: 'active' },
  { id: 5, name: 'Social Media', description: 'Guidelines for representing the company online.', author: 'Marketing', date: 'Feb 10, 2024', status: 'archived' },
  { id: 6, name: 'Security Awareness', description: 'Mandatory quarterly training requirements.', author: 'IT Sec', date: 'Mar 02, 2024', status: 'active' },
];

const StatCard = ({ title, value, icon: Icon, trend, colorClass }: any) => (
  <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-5 relative overflow-hidden group hover:border-white/10 transition-colors">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${colorClass}`}>
      <Icon size={64} />
    </div>
    <div className="relative z-10">
      <div className="text-zinc-500 text-sm font-medium mb-1 flex items-center gap-2">
        <Icon size={14} /> {title}
      </div>
      <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-xs text-zinc-500 mt-2">
        <span className="text-green-500 font-medium">{trend}</span> from last month
      </div>
    </div>
  </div>
);

export const PoliciesPage: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const filteredPolicies = MOCK_POLICIES.filter(p => filter === 'all' || p.status === filter);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Policies</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage and organize organizational compliance documents.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 rounded-lg text-sm font-medium transition-colors">
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
          >
            <Plus size={16} /> New Policy
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Policies" value="24" icon={FileText} trend="+12%" colorClass="text-indigo-500" />
        <StatCard title="Active Policies" value="18" icon={CheckCircle2} trend="+5%" colorClass="text-green-500" />
        <StatCard title="Archived" value="6" icon={Archive} trend="+0%" colorClass="text-orange-500" />
      </div>

      {/* Table Container */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500">Policy Name</th>
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500 w-1/3">Description</th>
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500">Author</th>
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500">Date</th>
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500">Status</th>
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map((policy) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={policy.id} 
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                          <FileText size={14} />
                        </div>
                        <span className="font-medium text-zinc-200 group-hover:text-white transition-colors">{policy.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-500 truncate max-w-[200px]">{policy.description}</td>
                    <td className="py-4 px-6 text-sm text-zinc-400">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-zinc-800 text-[10px] flex items-center justify-center text-zinc-400">
                           {policy.author.charAt(0)}
                        </div>
                        {policy.author}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-500 font-mono text-xs">{policy.date}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                        policy.status === 'active' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : policy.status === 'archived'
                            ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                      }`}>
                        {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-zinc-600 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle size={32} className="text-zinc-600 mb-2" />
                      <p>No policies found matching your filters.</p>
                      <button onClick={() => setFilter('all')} className="text-indigo-400 text-sm hover:underline">Clear Filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Policy Slide-over */}
      <AnimatePresence>
        {isCreateOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#0F0F12] border-l border-white/10 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0F0F12]">
                <h2 className="text-xl font-bold text-white">Create New Policy</h2>
                <button 
                  onClick={() => setIsCreateOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 {/* Form Fields */}
                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-medium text-zinc-400 mb-1.5">Policy Name</label>
                       <input 
                         type="text" 
                         className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-zinc-600 transition-all"
                         placeholder="e.g. Generative AI Usage Policy" 
                       />
                    </div>
                    
                    <div>
                       <label className="block text-sm font-medium text-zinc-400 mb-1.5">Description</label>
                       <textarea 
                         rows={3}
                         className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-zinc-600 transition-all"
                         placeholder="Briefly describe the purpose of this policy..." 
                       />
                    </div>
                 </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-[#0F0F12] flex justify-end gap-3">
                 <button 
                   onClick={() => setIsCreateOpen(false)}
                   className="px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                 >
                   Cancel
                 </button>
                 <button className="px-6 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2">
                   Create Policy <ArrowRight size={16} />
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};