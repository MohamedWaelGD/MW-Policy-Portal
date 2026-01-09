import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitMerge, 
  Shield, 
  CheckCircle2, 
  ArrowRight, 
  ListOrdered,
  Save,
  Trash2,
  AlertCircle
} from 'lucide-react';

// Mock Data matching the user's expected structure context
const MOCK_POLICIES = [
  { id: 'p1', name: 'Travel Expenses', description: 'Guidelines for domestic and international travel.' },
  { id: 'p2', name: 'Remote Work', description: 'Hybrid work policy including equipment stipends.' },
  { id: 'p3', name: 'Equipment Procurement', description: 'Process for requesting new hardware.' },
  { id: 'p4', name: 'Code of Conduct', description: 'Behavioral expectations and conflict resolution.' },
];

const MOCK_ROLES = [
  { id: 'r1', name: 'Team Lead' },
  { id: 'r2', name: 'Department Manager' },
  { id: 'r3', name: 'HR Director' },
  { id: 'r4', name: 'Finance Controller' },
  { id: 'r5', name: 'CTO' },
];

// Initial mock data for existing steps
const INITIAL_STEPS = [
  {
    id: 's1',
    policyId: 'p1',
    stepOrder: 1,
    isFinalStep: false,
    roleId: 'r1',
    roleName: 'Team Lead',
    policy: MOCK_POLICIES[0]
  },
  {
    id: 's2',
    policyId: 'p1',
    stepOrder: 2,
    isFinalStep: true,
    roleId: 'r4',
    roleName: 'Finance Controller',
    policy: MOCK_POLICIES[0]
  }
];

export const WorkflowBuilderPage: React.FC = () => {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>(MOCK_POLICIES[0].id);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(MOCK_ROLES[0].id);
  const [stepOrder, setStepOrder] = useState<number>(1);
  const [isFinalStep, setIsFinalStep] = useState<boolean>(false);
  const [steps, setSteps] = useState(INITIAL_STEPS);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const policy = MOCK_POLICIES.find(p => p.id === selectedPolicyId);
    const role = MOCK_ROLES.find(r => r.id === selectedRoleId);

    if (!policy || !role) return;

    const newStep = {
      id: crypto.randomUUID(),
      policyId: selectedPolicyId,
      stepOrder: Number(stepOrder),
      isFinalStep: isFinalStep,
      roleId: selectedRoleId,
      roleName: role.name,
      policy: policy
    };

    // Add to local state
    setSteps([...steps, newStep]);
    
    // Reset form slightly for next entry (auto-increment order)
    setStepOrder(prev => prev + 1);
    setIsFinalStep(false);

    console.log("Payload sent to API:", {
      policyId: selectedPolicyId,
      stepOrder: Number(stepOrder),
      isFinalStep: isFinalStep,
      roleId: selectedRoleId
    });
  };

  const handleDelete = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  // Filter steps for the currently selected policy to show relevant preview
  const currentPolicySteps = steps
    .filter(s => s.policyId === selectedPolicyId)
    .sort((a, b) => a.stepOrder - b.stepOrder);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <GitMerge className="text-indigo-500" /> 
          Workflow Builder
        </h1>
        <p className="text-zinc-400 text-sm mt-1 ml-9">Define approval chains and assign responsibilities for policy requests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Configuration Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 shadow-xl sticky top-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Shield size={18} className="text-indigo-400" />
              Configure Step
            </h2>
            
            <form onSubmit={handleSave} className="space-y-5">
              
              {/* Policy Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Select Policy</label>
                <div className="relative">
                  <select 
                    value={selectedPolicyId}
                    onChange={(e) => {
                      setSelectedPolicyId(e.target.value);
                      setStepOrder(1); // Reset order when policy changes
                    }}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none transition-all"
                  >
                    {MOCK_POLICIES.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <ArrowRight size={14} className="rotate-90" />
                  </div>
                </div>
              </div>

              {/* Step Order */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Step Order</label>
                <div className="relative">
                  <ListOrdered size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input 
                    type="number" 
                    min="0"
                    value={stepOrder}
                    onChange={(e) => setStepOrder(Number(e.target.value))}
                    className="w-full bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <p className="text-xs text-zinc-600">Lower numbers execute first (e.g., 1, 2, 3).</p>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Assign Role</label>
                <div className="relative">
                  <select 
                    value={selectedRoleId}
                    onChange={(e) => setSelectedRoleId(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none transition-all"
                  >
                    {MOCK_ROLES.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                    <ArrowRight size={14} className="rotate-90" />
                  </div>
                </div>
              </div>

              {/* Final Step Toggle */}
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="flex flex-col">
                   <span className="text-sm font-medium text-white">Final Approval</span>
                   <span className="text-xs text-zinc-500">Is this the last step?</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFinalStep(!isFinalStep)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${isFinalStep ? 'bg-indigo-600' : 'bg-zinc-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isFinalStep ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 active:translate-y-0.5"
              >
                <Save size={18} /> Add Step
              </button>

            </form>
          </div>
        </div>

        {/* Right Column: Visualization */}
        <div className="lg:col-span-2">
           <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-8 min-h-[500px]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                 <div>
                    <h3 className="text-lg font-semibold text-white">Workflow Preview</h3>
                    <p className="text-sm text-zinc-500">Current approval chain for <span className="text-indigo-400">{MOCK_POLICIES.find(p => p.id === selectedPolicyId)?.name}</span></p>
                 </div>
                 <div className="bg-zinc-900 border border-white/10 px-3 py-1 rounded text-xs font-mono text-zinc-400">
                    {currentPolicySteps.length} Steps Configured
                 </div>
              </div>

              {currentPolicySteps.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-64 text-zinc-500 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                    <AlertCircle size={32} className="mb-3 opacity-50" />
                    <p>No steps defined for this policy yet.</p>
                    <p className="text-xs mt-1">Add a step using the form on the left.</p>
                 </div>
              ) : (
                 <div className="relative space-y-0">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-[28px] top-4 bottom-4 w-0.5 bg-zinc-800 z-0"></div>

                    <AnimatePresence>
                      {currentPolicySteps.map((step, index) => (
                        <motion.div 
                           key={step.id}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           className="relative z-10 mb-6 last:mb-0 group"
                        >
                           <div className="flex items-start gap-4">
                              {/* Step Number Bubble */}
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 border-[#0A0A0A] shrink-0 shadow-xl transition-colors ${
                                 step.isFinalStep 
                                   ? 'bg-green-500 text-white' 
                                   : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                              }`}>
                                 {step.isFinalStep ? <CheckCircle2 size={24} /> : <span className="text-xl font-bold">{step.stepOrder}</span>}
                              </div>

                              {/* Card Content */}
                              <div className="flex-1 bg-[#111] border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all flex justify-between items-center group-hover:bg-[#161616]">
                                 <div>
                                    <h4 className="text-white font-medium flex items-center gap-2">
                                      {step.roleName}
                                      {step.isFinalStep && (
                                        <span className="text-[10px] uppercase tracking-wider bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded border border-green-500/20">Final</span>
                                      )}
                                    </h4>
                                    <div className="text-xs text-zinc-500 mt-1 font-mono">
                                       ID: {step.roleId} • Policy: {step.policy.name}
                                    </div>
                                 </div>
                                 
                                 <button 
                                   onClick={() => handleDelete(step.id)}
                                   className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                   title="Remove Step"
                                 >
                                    <Trash2 size={18} />
                                 </button>
                              </div>
                           </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                 </div>
              )}
           </div>
        </div>

      </div>
    </motion.div>
  );
};