import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  GitPullRequest, 
  Users, 
  Settings, 
  Bell, 
  Search,
  LogOut,
  ChevronDown,
  GitMerge,
  Shield
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  activePage: string;
}

const SIDEBAR_LINKS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'policies', icon: FileText, label: 'Policies' },
  { id: 'requests', icon: GitPullRequest, label: 'Requests', badge: '3' },
  { id: 'workflows', icon: GitMerge, label: 'Workflows' },
  { id: 'roles', icon: Shield, label: 'Roles' },
  { id: 'users', icon: Users, label: 'Users' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onLogout, onNavigate, activePage }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 border-r border-white/5 bg-[#0A0A0A] flex flex-col z-20 hidden md:flex"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
             <div className="w-4 h-4 bg-white rounded-sm opacity-90" />
          </div>
          <span className="font-bold tracking-tight text-lg">MW Policy</span>
        </div>

        <div className="px-3 py-2 flex-1 space-y-1">
          <div className="text-xs font-medium text-zinc-500 px-3 py-2 uppercase tracking-wider">Main Menu</div>
          {SIDEBAR_LINKS.map((link) => (
            <div 
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                activePage === link.id 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/10' 
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <link.icon size={18} />
                <span className="text-sm font-medium">{link.label}</span>
              </div>
              {link.badge && (
                <span className="bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                  {link.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
           <button 
             onClick={onLogout}
             className="flex items-center gap-3 text-zinc-500 hover:text-red-400 transition-colors w-full px-3 py-2 text-sm font-medium"
           >
             <LogOut size={18} />
             Sign Out
           </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md flex items-center justify-between px-6 md:px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4 text-sm text-zinc-400">
             <span className="hover:text-white cursor-pointer transition-colors">Team</span>
             <span className="text-zinc-700">/</span>
             <span className="text-white font-medium">Engineering Policies</span>
          </div>

          <div className="flex items-center gap-6">
             <div className="relative group hidden sm:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="bg-[#111] border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-zinc-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 w-64 transition-all placeholder:text-zinc-600"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                   <kbd className="hidden group-focus-within:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
                      <span className="text-xs">⌘</span>K
                   </kbd>
                </div>
             </div>

             <div className="h-4 w-px bg-white/10 mx-2 hidden sm:block"></div>

             <button 
                onClick={() => onNavigate('notifications')}
                className="relative text-zinc-400 hover:text-white transition-colors"
             >
               <Bell size={20} />
               <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#050505]"></span>
             </button>

             <div 
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1 rounded-lg transition-colors pr-2"
             >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-indigo-500/20">
                  JD
                </div>
                <ChevronDown size={14} className="text-zinc-500" />
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#050505] p-6 md:p-8 scroll-smooth">
           {children}
        </main>

        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-96 bg-indigo-900/5 pointer-events-none blur-3xl rounded-b-[100px]" />
      </div>
    </div>
  );
};