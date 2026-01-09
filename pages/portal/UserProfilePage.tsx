import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  GitPullRequest, 
  Upload, 
  Plus, 
  FileText, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  X,
  ArrowRight,
  MoreVertical,
  LogOut,
  Settings
} from 'lucide-react';

// Mock Policies for the dropdown
const AVAILABLE_POLICIES = [
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Travel Expenses', description: 'Reimbursement for travel.' },
  { id: '2', name: 'Hardware Request', description: 'New laptops and monitors.' },
  { id: '3', name: 'Software License', description: 'SaaS subscriptions.' },
];

// Mock Data - representing the logged-in user's requests
const INITIAL_MY_REQUESTS = [
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "policyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "createdByUserId": "user-current",
    "status": "Pending",
    "createdAt": "2026-01-09T05:37:27.180Z",
    "policy": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Travel Expenses",
      "description": "Guidelines for domestic and international travel reimbursement limits.",
      "isActive": true,
      "createdAt": "2026-01-09T05:37:27.181Z",
      "updateddAt": "2026-01-09T05:37:27.181Z",
      "createdByUserId": "admin-1",
      "createByUserName": "Admin"
    },
    "createdByUserName": "Current User",
    "approvals": [
      {
        "id": "app-1",
        "approverUserId": "manager-1",
        "status": "Pending",
        "comment": "",
        "actionDate": null,
        "attachmentPath": ""
      }
    ]
  }
];

export const UserProfilePage: React.FC = () => {
  const [requests, setRequests] = useState(INITIAL_MY_REQUESTS);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState(AVAILABLE_POLICIES[0].id);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const policy = AVAILABLE_POLICIES.find(p => p.id === selectedPolicyId);
    
    if (!policy) return;

    const newRequest = {
      id: crypto.randomUUID(),
      policyId: selectedPolicyId,
      createdByUserId: "user-current",
      status: "Pending",
      createdAt: new Date().toISOString(),
      policy: {
        id: policy.id,
        name: policy.name,
        description: policy.description,
        isActive: true,
        createdAt: new Date().toISOString(),
        updateddAt: new Date().toISOString(),
        createdByUserId: "admin-1",
        createByUserName: "System"
      },
      createdByUserName: "Current User",
      approvals: []
    };

    setRequests([newRequest, ...requests]);
    setIsCreateOpen(false);
    setUploadedFile(null);
    setSelectedPolicyId(AVAILABLE_POLICIES[0].id);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      {/* Profile Header */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-500">
           <User size={120} />
        </div>
        
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 p-1 relative z-10 shadow-2xl shadow-indigo-500/20">
            <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center">
                 <span className="text-2xl font-bold text-white">JD</span>
            </div>
        </div>
        
        <div className="flex-1 text-center md:text-left z-10">
             <h1 className="text-3xl font-bold text-white">John Doe</h1>
             <p className="text-zinc-400 mt-1">Software Engineer • Engineering Dept</p>
             <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-sm text-zinc-500">
                 <span className="flex items-center gap-1"><FileText size={14}/> {requests.length} Requests</span>
                 <span className="flex items-center gap-1 text-green-500"><CheckCircle2 size={14}/> {requests.filter(r => r.status === 'Approved').length} Approved</span>
             </div>
        </div>

        <div className="flex flex-col gap-3 z-10 w-full md:w-auto">
             <button 
               onClick={() => setIsCreateOpen(true)}
               className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
             >
                <Plus size={18} /> New Request
             </button>
             <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-xl font-medium border border-white/5 transition-all">
                <Settings size={18} /> Edit Profile
             </button>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GitPullRequest className="text-zinc-500" />
            Request History
          </h2>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
         <AnimatePresence>
            {requests.map((req) => (
                <motion.div 
                   key={req.id}
                   layout
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 group hover:border-white/10 transition-colors"
                >
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex items-start gap-4">
                           <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 mt-1">
                               {req.policy.name.includes('Travel') ? <FileText size={20} /> : <FileText size={20} />}
                           </div>
                           <div>
                               <div className="flex items-center gap-3">
                                  <h3 className="text-white font-medium text-lg">{req.policy.name}</h3>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(req.status)}`}>
                                       {req.status}
                                   </span>
                               </div>
                               <p className="text-sm text-zinc-500 mt-1 line-clamp-1">{req.policy.description}</p>
                               <div className="flex items-center gap-3 mt-2 text-xs text-zinc-600">
                                   <span className="flex items-center gap-1">
                                      <Clock size={12} /> {new Date(req.createdAt).toLocaleDateString()}
                                   </span>
                                   <span>ID: {req.id.slice(0, 8)}</span>
                               </div>
                           </div>
                       </div>
                   </div>

                   {/* Approval Timeline Preview */}
                   <div className="mt-6 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Progress Tracking</h4>
                            <span className="text-xs text-indigo-400 hover:underline cursor-pointer">View Details</span>
                        </div>
                        
                        <div className="relative pt-2 pb-2">
                             {/* Progress Bar Background */}
                             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 rounded-full"></div>
                             
                             {/* Nodes */}
                             <div className="relative flex justify-between">
                                 {/* Start Node */}
                                 <div className="flex flex-col items-center gap-2">
                                     <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-[#0A0A0A] flex items-center justify-center text-white z-10 shadow-lg shadow-indigo-900/50">
                                         <CheckCircle2 size={14} />
                                     </div>
                                     <span className="text-[10px] text-zinc-300 font-medium">Submitted</span>
                                 </div>

                                 {/* Approval Nodes (Mocked for visual) */}
                                 <div className="flex flex-col items-center gap-2">
                                     <div className={`w-8 h-8 rounded-full border-4 border-[#0A0A0A] flex items-center justify-center z-10 ${req.status === 'Approved' ? 'bg-green-500 text-black' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                                         {req.status === 'Approved' ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse" />}
                                     </div>
                                     <span className="text-[10px] text-zinc-500 font-medium">Manager Review</span>
                                 </div>

                                 <div className="flex flex-col items-center gap-2">
                                     <div className="w-8 h-8 rounded-full bg-zinc-800 border-4 border-[#0A0A0A] flex items-center justify-center text-zinc-600 z-10 border-zinc-800">
                                         <div className="w-2 h-2 bg-zinc-700 rounded-full" />
                                     </div>
                                     <span className="text-[10px] text-zinc-600">Final Approval</span>
                                 </div>
                             </div>
                        </div>
                   </div>
                </motion.div>
            ))}
         </AnimatePresence>
         {requests.length === 0 && (
             <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                 <p className="text-zinc-500 text-sm">You haven't submitted any requests yet.</p>
             </div>
         )}
      </div>

      {/* Create Request Modal - Centering Fix */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[#0F0F12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Create Request</h2>
                <button 
                  onClick={() => setIsCreateOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit}>
                  <div className="p-6 space-y-6">
                     
                     <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-400">Select Policy</label>
                        <div className="relative">
                            <select 
                                value={selectedPolicyId}
                                onChange={(e) => setSelectedPolicyId(e.target.value)}
                                className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none transition-all"
                            >
                                {AVAILABLE_POLICIES.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                <ArrowRight size={14} className="rotate-90" />
                            </div>
                        </div>
                        <p className="text-xs text-zinc-600">
                            {AVAILABLE_POLICIES.find(p => p.id === selectedPolicyId)?.description}
                        </p>
                     </div>

                     <div className="space-y-2">
                        <label className="block text-sm font-medium text-zinc-400">Supporting Documents</label>
                        <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-white/5 transition-all ${uploadedFile ? 'border-green-500/30 bg-green-500/5' : 'border-white/10 bg-[#050505]'}`}>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {uploadedFile ? (
                                    <>
                                        <div className="w-10 h-10 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <p className="text-sm text-white font-medium">{uploadedFile.name}</p>
                                        <p className="text-xs text-zinc-500 mt-1">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-zinc-500 mb-3" />
                                        <p className="text-sm text-zinc-400"><span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-zinc-600 mt-1">PDF, DOCX, or PNG (MAX. 5MB)</p>
                                    </>
                                )}
                            </div>
                            <input type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                     </div>

                  </div>

                  <div className="p-6 border-t border-white/10 bg-[#0A0A0A] flex justify-end gap-3">
                     <button 
                       type="button"
                       onClick={() => setIsCreateOpen(false)}
                       className="px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                     >
                       Cancel
                     </button>
                     <button 
                        type="submit"
                        className="px-6 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                     >
                       Submit Request <ArrowRight size={16} />
                     </button>
                  </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};