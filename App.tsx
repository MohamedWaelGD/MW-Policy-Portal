import React, { useState } from 'react';
import LandingPage from './pages/portal/LandingPage';
import { AuthPage } from './pages/portal/AuthPage';
import { UserProfilePage } from './pages/portal/UserProfilePage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { PoliciesPage } from './pages/dashboard/PoliciesPage';
import { WorkflowBuilderPage } from './pages/dashboard/WorkflowBuilderPage';
import { RequestsPage } from './pages/dashboard/RequestsPage';
import { RolesPage } from './pages/dashboard/RolesPage';
import { UsersPage } from './pages/dashboard/UsersPage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';

const App: React.FC = () => {
  const [view, setView] = useState<string>('landing');

  const renderContent = () => {
    if (view === 'landing') return <LandingPage onNavigate={(page) => setView(page)} />;
    if (view === 'auth') return <AuthPage onBack={() => setView('landing')} onLogin={() => setView('dashboard')} />;
    
    // Dashboard views
    return (
      <DashboardLayout 
        activePage={view} 
        onNavigate={setView} 
        onLogout={() => setView('landing')}
      >
         {view === 'dashboard' && <PoliciesPage />}
         {view === 'policies' && <PoliciesPage />}
         {view === 'workflows' && <WorkflowBuilderPage />}
         {view === 'requests' && <RequestsPage />}
         {view === 'roles' && <RolesPage />}
         {view === 'users' && <UsersPage />}
         {view === 'notifications' && <NotificationsPage />}
         {view === 'profile' && <UserProfilePage />}
         {/* Fallback for other dashboard pages not yet implemented */}
         {['settings'].includes(view) && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-500">
               <p>Page under construction</p>
            </div>
         )}
      </DashboardLayout>
    );
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-white overflow-x-hidden font-sans">
      {/* Background Mesh Gradients - Only visible on Landing Page */}
      {view === 'landing' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
           <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
           <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
           <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />
        </div>
      )}
      
      <div className="relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;