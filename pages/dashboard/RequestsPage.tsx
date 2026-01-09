import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitPullRequest, 
  Trash2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MoreVertical,
  Filter,
  X,
  User,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Send
} from 'lucide-react';

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
        "id": "app-2-1",
        "approverUserId": "manager-1",
        "status": "Approved",
        "comment": "Approved for purchase.",
        "actionDate": "2026-01-08T12:00:00.000Z",
        "attachmentPath": ""
      },
      {
        "id": "app-2",
        "approverUserId": "director-1",
        "status": "Approved",
        "comment": "Looks good, proceed.",
        "actionDate": "2026-01-08T14:00:00.000Z",
        "attachmentPath": ""
      }
    ]
  }
];

export const RequestsPage: React.FC = () => {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  
  // Decision Form State
  const [decisionMode, setDecisionMode] = useState<'approve' | 'reject' | null>(null);
  const [decisionComment, setDecisionComment] = useState('');
  const [decisionFile, setDecisionFile] = useState<File | null>(null);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this request?')) {
      setRequests(requests.filter(r => r.id !== id));
      if (selectedRequest?.id === id) setSelectedRequest(null);
    }
  };

  const handleDecisionSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedRequest || !decisionMode) return;

      const newStatus = decisionMode === 'approve' ? 'Approved' : 'Rejected';
      
      // Update local state to reflect change (mock)
      const updatedRequests = requests.map(req => {
          if (req.id === selectedRequest.id) {
              const newApproval = {
                  id: crypto.randomUUID(),
                  approverUserId: "current-admin",
                  status: newStatus,
                  comment: decisionComment,
                  actionDate: new Date().toISOString(),
                  attachmentPath: decisionFile ? decisionFile.name : ""
              };
              return {
                  ...req,
                  status: newStatus, // Simplified status update
                  approvals: [...req.approvals, newApproval]
              };
          }
          return req;
      });

      setRequests(updatedRequests);
      // Update selected request view
      setSelectedRequest(updatedRequests.find(r => r.id === selectedRequest.id));
      
      // Reset form
      setDecisionMode(null);
      setDecisionComment('');
      setDecisionFile(null);
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
            All Requests
          </h1>
          <p className="text-zinc-400 text-sm mt-1 ml-9">Admin view of all submitted policy requests across the organization.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 rounded-lg text-sm font-medium transition-colors">
            <Filter size={16} /> Filter Status
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
                   onClick={() => setSelectedRequest(req)}
                   className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 group hover:border-white/10 transition-colors cursor-pointer"
                >
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                       <div className="flex items-start gap-4">
                           <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 mt-1">
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
                                   <span className="text-xs text-zinc-500 border-l border-white/10 pl-3">
                                      By: <span className="text-zinc-300">{req.createdByUserName}</span>
                                   </span>
                               </div>
                           </div>
                       </div>

                       <div className="flex items-center gap-3 self-end md:self-center">
                           <button 
                             onClick={(e) => handleDelete(req.id, e)}
                             className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                             title="Delete Request"
                           >
                               <Trash2 size={18} />
                           </button>
                           <ArrowRight size={18} className="text-zinc-600 group-hover:text-white transition-colors" />
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
             </div>
         )}
      </div>

      {/* Request Details Slide-Over */}
      <AnimatePresence>
        {selectedRequest && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRequest(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#0F0F12] border-l border-white/10 z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-start justify-between bg-[#0F0F12]">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                       <h2 className="text-xl font-bold text-white">{selectedRequest.policy.name}</h2>
                       <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(selectedRequest.status)}`}>
                            {selectedRequest.status}
                       </span>
                   </div>
                   <p className="text-sm text-zinc-500 flex items-center gap-2">
                      <User size={14} /> Requested by <span className="text-zinc-300">{selectedRequest.createdByUserName}</span>
                   </p>
                </div>
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                 
                 {/* Details Section */}
                 <div className="space-y-4">
                     <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Request Details</h3>
                     <div className="bg-[#050505] rounded-xl p-4 border border-white/5 space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-zinc-500 block text-xs">Policy ID</span>
                                <span className="text-zinc-300 font-mono">{selectedRequest.policyId.slice(0,8)}</span>
                            </div>
                            <div>
                                <span className="text-zinc-500 block text-xs">Submission Date</span>
                                <span className="text-zinc-300">{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-white/5">
                            <span className="text-zinc-500 block text-xs mb-1">Description</span>
                            <p className="text-zinc-300 text-sm leading-relaxed">{selectedRequest.policy.description}</p>
                        </div>
                     </div>
                 </div>

                 {/* Workflow History Timeline */}
                 <div>
                     <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Workflow History</h3>
                     <div className="relative pl-4 space-y-8">
                         {/* Connecting Line */}
                         <div className="absolute left-[23px] top-2 bottom-4 w-0.5 bg-zinc-800" />
                         
                         {/* Initial Submission Node */}
                         <div className="relative flex gap-4 z-10">
                             <div className="w-4 h-4 rounded-full bg-indigo-600 border-2 border-[#0F0F12] mt-1 shrink-0 shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
                             <div className="flex-1">
                                 <div className="bg-[#18181b] p-3 rounded-lg border border-white/5">
                                     <div className="flex justify-between items-start mb-1">
                                         <span className="text-sm font-medium text-white">Request Submitted</span>
                                         <span className="text-xs text-zinc-500">{new Date(selectedRequest.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                     </div>
                                     <p className="text-xs text-zinc-400">Initiated by {selectedRequest.createdByUserName}</p>
                                 </div>
                             </div>
                         </div>

                         {/* Approval Nodes */}
                         {selectedRequest.approvals.map((approval: any) => (
                             <div key={approval.id} className="relative flex gap-4 z-10">
                                 <div className={`w-4 h-4 rounded-full border-2 border-[#0F0F12] mt-1 shrink-0 ${
                                     approval.status === 'Approved' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                                     approval.status === 'Rejected' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                     'bg-zinc-700'
                                 }`}></div>
                                 <div className="flex-1">
                                     <div className="bg-[#18181b] p-3 rounded-lg border border-white/5">
                                         <div className="flex justify-between items-start mb-1">
                                             <span className={`text-sm font-medium ${
                                                 approval.status === 'Approved' ? 'text-green-400' :
                                                 approval.status === 'Rejected' ? 'text-red-400' :
                                                 'text-zinc-300'
                                             }`}>{approval.status} by {approval.approverUserId}</span>
                                             {approval.actionDate && (
                                                <span className="text-xs text-zinc-500">{new Date(approval.actionDate).toLocaleDateString()}</span>
                                             )}
                                         </div>
                                         {approval.comment && (
                                             <p className="text-xs text-zinc-400 mt-2 bg-black/20 p-2 rounded italic">"{approval.comment}"</p>
                                         )}
                                         {approval.attachmentPath && (
                                             <div className="flex items-center gap-2 mt-2 text-xs text-indigo-400 bg-indigo-500/10 p-1.5 rounded w-fit">
                                                 <Paperclip size={12} /> {approval.attachmentPath}
                                             </div>
                                         )}
                                     </div>
                                 </div>
                             </div>
                         ))}
                         
                         {/* Pending Node (if applicable) */}
                         {selectedRequest.status === 'Pending' && (
                             <div className="relative flex gap-4 z-10">
                                 <div className="w-4 h-4 rounded-full bg-[#0F0F12] border-2 border-zinc-700 mt-1 shrink-0 animate-pulse"></div>
                                 <div className="flex-1">
                                     <span className="text-sm text-zinc-500 italic">Waiting for review...</span>
                                 </div>
                             </div>
                         )}
                     </div>
                 </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 border-t border-white/10 bg-[#0F0F12]">
                 {!decisionMode ? (
                     <div className="grid grid-cols-2 gap-4">
                        <button 
                           onClick={() => setDecisionMode('reject')}
                           disabled={selectedRequest.status !== 'Pending'}
                           className="flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ThumbsDown size={18} /> Reject
                        </button>
                        <button 
                           onClick={() => setDecisionMode('approve')}
                           disabled={selectedRequest.status !== 'Pending'}
                           className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ThumbsUp size={18} /> Approve
                        </button>
                     </div>
                 ) : (
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#050505] rounded-xl p-4 border border-white/10"
                     >
                        <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 ${decisionMode === 'approve' ? 'text-green-400' : 'text-red-400'}`}>
                            {decisionMode === 'approve' ? <ThumbsUp size={16}/> : <ThumbsDown size={16}/>}
                            {decisionMode === 'approve' ? 'Approve Request' : 'Reject Request'}
                        </h4>
                        
                        <form onSubmit={handleDecisionSubmit} className="space-y-4">
                            <textarea 
                                value={decisionComment}
                                onChange={(e) => setDecisionComment(e.target.value)}
                                placeholder="Add a comment..." 
                                className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 min-h-[80px]"
                                required
                            />
                            
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer hover:text-white transition-colors">
                                    <Paperclip size={14} />
                                    {decisionFile ? decisionFile.name : 'Attach File (Optional)'}
                                    <input type="file" className="hidden" onChange={(e) => setDecisionFile(e.target.files?.[0] || null)} />
                                </label>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setDecisionMode(null);
                                        setDecisionComment('');
                                        setDecisionFile(null);
                                    }}
                                    className="flex-1 py-2 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className={`flex-1 py-2 rounded-lg text-xs font-medium text-white shadow-lg flex items-center justify-center gap-2 ${
                                        decisionMode === 'approve' ? 'bg-green-600 hover:bg-green-500 shadow-green-500/20' : 'bg-red-600 hover:bg-red-500 shadow-red-500/20'
                                    }`}
                                >
                                    <Send size={12} /> Submit Decision
                                </button>
                            </div>
                        </form>
                     </motion.div>
                 )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};