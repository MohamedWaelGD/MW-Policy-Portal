import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Trash2, 
  Search,
  MoreHorizontal,
  X,
  UserCog,
  Shield,
  ArrowRight
} from 'lucide-react';

// Mock Data
const INITIAL_USERS = [
  { id: "1", name: "John Doe", email: "john@mw.com", roleId: "role-4", roleName: "Employee" },
  { id: "2", name: "Sarah Smith", email: "sarah@mw.com", roleId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", roleName: "Admin" },
  { id: "3", name: "Mike Johnson", email: "mike@mw.com", roleId: "role-2", roleName: "Manager" },
];

const AVAILABLE_ROLES = [
  { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Admin" },
  { id: "role-2", name: "Manager" },
  { id: "role-3", name: "HR Director" },
  { id: "role-4", name: "Employee" }
];

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // State for Assignment
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRoleId, setSelectedRoleId] = useState('');

  // State for Create
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const openAssignModal = (user: any) => {
    setSelectedUser(user);
    setSelectedRoleId(user.roleId);
    setIsAssignOpen(true);
  };

  const handleAssignRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !selectedRoleId) return;

    const role = AVAILABLE_ROLES.find(r => r.id === selectedRoleId);
    if (!role) return;

    const updatedUsers = users.map(u => 
      u.id === selectedUser.id ? { ...u, roleId: role.id, roleName: role.name } : u
    );

    setUsers(updatedUsers);
    setIsAssignOpen(false);
  };

  const handleCreateUser = (e: React.FormEvent) => {
      e.preventDefault();
      const user = {
          id: crypto.randomUUID(),
          name: newUser.name,
          email: newUser.email,
          roleId: "role-4", // Default to Employee
          roleName: "Employee"
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '' });
      setIsCreateOpen(false);
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
            <Users className="text-indigo-500" /> 
            Users Management
          </h1>
          <p className="text-zinc-400 text-sm mt-1 ml-9">Manage users and assign roles.</p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500">User</th>
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500">Email</th>
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500">Current Role</th>
                <th className="py-3 px-6 text-xs font-medium uppercase tracking-wider text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <motion.tr 
                  key={user.id}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-zinc-400">
                    {user.email}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                       <Shield size={10} /> {user.roleName}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => openAssignModal(user)}
                         className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
                         title="Assign Role"
                       >
                         <UserCog size={16} /> Assign Role
                       </button>
                       <button 
                         onClick={() => handleDelete(user.id)}
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

      {/* Assign Role Modal */}
      <AnimatePresence>
        {isAssignOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAssignOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-[#0F0F12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Assign Role</h2>
                <button 
                  onClick={() => setIsAssignOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                 <div className="mb-6 flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                        {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white">{selectedUser.name}</div>
                        <div className="text-xs text-zinc-400">{selectedUser.email}</div>
                    </div>
                 </div>

                 <form onSubmit={handleAssignRole} className="space-y-4">
                    <div>
                       <label className="block text-sm font-medium text-zinc-400 mb-2">Select Role</label>
                       <div className="space-y-2">
                          {AVAILABLE_ROLES.map(role => (
                              <label 
                                key={role.id}
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                                    selectedRoleId === role.id 
                                    ? 'bg-indigo-600/10 border-indigo-500/50' 
                                    : 'bg-[#050505] border-white/10 hover:border-white/20'
                                }`}
                              >
                                  <div className="flex items-center gap-3">
                                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedRoleId === role.id ? 'border-indigo-500' : 'border-zinc-600'}`}>
                                          {selectedRoleId === role.id && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                                      </div>
                                      <span className={`text-sm ${selectedRoleId === role.id ? 'text-white font-medium' : 'text-zinc-400'}`}>{role.name}</span>
                                  </div>
                              </label>
                          ))}
                       </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button 
                          type="button"
                          onClick={() => setIsAssignOpen(false)}
                          className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-6 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all"
                        >
                          Save Assignment
                        </button>
                    </div>
                 </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create User Modal */}
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
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative w-full max-w-md bg-[#0F0F12] border border-white/10 rounded-2xl shadow-2xl p-6 z-10"
                  >
                      <h2 className="text-xl font-bold text-white mb-4">Add New User</h2>
                      <form onSubmit={handleCreateUser} className="space-y-4">
                          <div>
                              <label className="text-sm text-zinc-400 block mb-1">Full Name</label>
                              <input 
                                  type="text" 
                                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none"
                                  value={newUser.name}
                                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                                  required
                              />
                          </div>
                          <div>
                              <label className="text-sm text-zinc-400 block mb-1">Email Address</label>
                              <input 
                                  type="email" 
                                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none"
                                  value={newUser.email}
                                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                                  required
                              />
                          </div>
                          <div className="flex justify-end gap-2 mt-6">
                              <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 text-zinc-400 text-sm hover:text-white">Cancel</button>
                              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-500">Create User</button>
                          </div>
                      </form>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>

    </motion.div>
  );
};