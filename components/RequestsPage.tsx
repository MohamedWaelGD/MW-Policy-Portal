import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitPullRequest, 
  Upload, 
  Plus, 
  Trash2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  X,
  ArrowRight,
  Paperclip,
  MoreVertical
} from 'lucide-react';

// Mock Policies for the dropdown
const AVAILABLE_POLICIES = [
  { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Travel Expenses', description: 'Reimbursement for travel.' },
  { id: '2', name: 'Hardware Request', description: 'New laptops and monitors.' },
  { id: '3', name: 'Software License', description: 'SaaS subscriptions.' },
];

// Mock Data strictly following the provided JSON structure
const INITIAL_REQUESTS = [
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "policyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "createdByUserId": "user-123",
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
    "createdByUserName": "John Doe",
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
  },
  {
    "id": "req-2",
    "policyId": "2",
    "createdByUserId": "user-123",
    "status": "Approved",
    "createdAt": "2026-01-08T10:00:00.000Z",
    "policy": {
      "id": "2",
      "name": "Hardware Request",
      "description": "Standard equipment provisioning.",
      "isActive": true,
      "createdAt": "2025-12-01T00:00:00.000Z",
      "updateddAt": "2025-12-01T00:00:00.000Z",
      "createdByUserId": "admin-1",
      "createByUserName": "Admin"
    },
    "createdByUserName": "John Doe",
    "approvals": [
      {
        "id": "app-2",
        "approverUserId": "manager-1",
        "status": "Approved",
        "comment": "Looks good.",
        "actionDate": "2026-01-08T14:00:00.000Z",
        "attachmentPath": ""
      }
    ]
  }
];

export const RequestsPage: React.FC = () => {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPolicyId, setSelectedPolicyId] = useState(AVAILABLE_POLICIES[0].id);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this request?')) {
      setRequests(requests.filter(r => r.id !== id));
    }
  };

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
      className="max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <GitPullRequest className="text-indigo-500" /> 
            My Requests
          </h1>
          <p className="text-zinc-400 text-sm mt-1 ml-9">Track and manage your submitted policy requests.</p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
        >
          <Plus size={16} /> New Request
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-5 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white">
                 <FileText size={20} />
             </div>
             <div>
                 <div className="text-2xl font-bold text-white">{requests.length}</div>
                 <div className="text-xs text-zinc-500">Total Requests</div>
             </div>
         </div>
         <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-5 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                 <Clock size={20} />
             </div>
             <div>
                 <div className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'Pending').length}</div>
                 <div className="text-xs text-zinc-500">Pending Approval</div>
             </div>
         </div>
         <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-5 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                 <CheckCircle2 size={20} />
             </div>
             <div>
                 <div className="text-2xl font-bold text-white">{requests.filter(r => r.status === 'Approved').length}</div>
                 <div className="text-xs text-zinc-500">Approved</div>
             </div>
         </div>
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
                   exit={{ opacity: 0, x: -20 }}
                   className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 group hover:border-white/10 transition-colors"
                >
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex items-start gap-4">
                           <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mt-1">
                               <FileText size={20} />
                           </div>
                           <div>
                               <h3 className="text-white font-medium text-lg">{req.policy.name}</h3>
                               <p className="text-sm text-zinc-500 line-clamp-1">{req.policy.description}</p>
                               <div className="flex items-center gap-3 mt-2">
                                   <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(req.status)}`}>
                                       {req.status}
                                   </span>
                                   <span className="text-xs text-zinc-600 flex items-center gap-1">
                                      <Clock size={12} /> {new Date(req.createdAt).toLocaleDateString()}
                                   </span>
                                   <span className="text-xs text-zinc-600">ID: {req.id.slice(0, 8)}...</span>
                               </div>
                           </div>
                       </div>

                       <div className="flex items-center gap-3 self-end md:self-center">
                           <button 
                             onClick={() => handleDelete(req.id)}
                             className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                             title="Delete Request"
                           >
                               <Trash2 size={18} />
                           </button>
                           <button className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                               <MoreVertical size={18} />
                           </button>
                       </div>
                   </div>

                   {/* Approval Timeline Preview (Optional visual enhancement) */}
                   <div className="mt-6 pt-4 border-t border-white/5">
                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Approval Flow</h4>
                        <div className="flex items-center gap-2">
                             <div className="flex items-center">
                                 <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white z-10">
                                     <CheckCircle2 size={12} />
                                 </div>
                                 <div className="h-0.5 w-16 bg-zinc-800 -ml-1"></div>
                             </div>
                             {req.approvals.length > 0 ? req.approvals.map((app, i) => (
                                 <div key={app.id} className="flex items-center">
                                     <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 z-10 ${
                                         app.status === 'Approved' ? 'bg-green-500 border-green-500 text-black' : 
                                         app.status === 'Rejected' ? 'bg-red-500 border-red-500 text-white' :
                                         'bg-zinc-900 border-zinc-700 text-zinc-500'
                                     }`}>
                                         {app.status === 'Approved' && <CheckCircle2 size={12} />}
                                         {app.status === 'Rejected' && <XCircle size={12} />}
                                         {app.status === 'Pending' && <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />}
                                     </div>
                                     {i < req.approvals.length - 1 && <div className="h-0.5 w-16 bg-zinc-800 -ml-1"></div>}
                                 </div>
                             )) : (
                                 <div className="text-xs text-zinc-600 italic">No approvers assigned yet.</div>
                             )}
                        </div>
                   </div>
                </motion.div>
            ))}
         </AnimatePresence>
         {requests.length === 0 && (
             <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                 <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-500">
                     <FileText size={20} />
                 </div>
                 <h3 className="text-zinc-300 font-medium">No requests found</h3>
                 <p className="text-zinc-500 text-sm mt-1">Submit a new policy request to get started.</p>
             </div>
         )}
      </div>

      {/* Create Request Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0F0F12] border border-white/10 rounded-2xl z-50 shadow-2xl overflow-hidden"
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
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};