import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Plus, 
  Trash2, 
  Search,
  MoreVertical,
  X,
  Save,
  Users
} from 'lucide-react';

// Mock Data
const INITIAL_ROLES = [
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Admin" },
  { id: "role-2", name: "Manager" },
  { id: "role-3", name: "HR Director" },
  { id: "role-4", name: "Employee" }
];

export const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const newRole = {
      id: crypto.randomUUID(),
      name: newRoleName
    };

    setRoles([...roles, newRole]);
    setNewRoleName('');
    setIsCreateOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <Shield className="text-indigo-500" /> 
            Roles & Permissions
          </h1>
          <p className="text-zinc-400 text-sm mt-1 ml-9">Manage system roles and access levels.</p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
        >
          <Plus size={16} /> New Role
        </button>
      </div>

      <div className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500">Role Name</th>
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500">Role ID</th>
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {roles.map((role) => (
                <motion.tr 
                  key={role.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-indigo-400">
                        <Shield size={14} />
                      </div>
                      <span className="font-medium text-white">{role.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-zinc-500 font-mono text-xs">
                    {role.id}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => handleDelete(role.id)}
                         className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Role Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-[#0F0F12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Create Role</h2>
                <button 
                  onClick={() => setIsCreateOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="p-6 space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Role Name</label>
                    <input 
                      type="text" 
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-zinc-600 transition-all"
                      placeholder="e.g. Supervisor" 
                      autoFocus
                    />
                 </div>

                 <div className="flex justify-end gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setIsCreateOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                    >
                      <Save size={16} /> Save Role
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