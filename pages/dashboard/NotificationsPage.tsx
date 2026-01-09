import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  Info, 
  ChevronRight,
  Check
} from 'lucide-react';

// Mock Data based on provided entity structure
const INITIAL_NOTIFICATIONS = [
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "Pending Request Review",
    "description": "A new request for 'Travel Expenses' requires your approval.",
    "referenceId": "req-123",
    "isSeen": false,
    "type": "PendingRequest",
    "createdAt": "2026-01-09T06:02:47.280Z"
  },
  {
    "id": "notif-2",
    "title": "Request Approved",
    "description": "Your request for 'Hardware Upgrade' has been approved by IT Director.",
    "referenceId": "req-456",
    "isSeen": true,
    "type": "ApprovedRequest",
    "createdAt": "2026-01-08T14:30:00.000Z"
  },
  {
    "id": "notif-3",
    "title": "System Maintenance",
    "description": "The portal will be down for maintenance on Sunday at 2 AM.",
    "referenceId": "sys-1",
    "isSeen": true,
    "type": "System",
    "createdAt": "2026-01-07T09:00:00.000Z"
  }
];

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isSeen: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isSeen: true } : n));
  };

  const getIcon = (type: string) => {
      switch (type) {
          case 'PendingRequest': return <Clock size={20} className="text-yellow-500" />;
          case 'ApprovedRequest': return <CheckCircle2 size={20} className="text-green-500" />;
          default: return <Info size={20} className="text-indigo-500" />;
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <Bell className="text-indigo-500" /> 
            Notifications
          </h1>
          <p className="text-zinc-400 text-sm mt-1 ml-9">Updates on your requests and system alerts.</p>
        </div>
        <button 
            onClick={markAllAsRead}
            className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-indigo-500/10 transition-colors"
        >
            <Check size={16} /> Mark all as read
        </button>
      </div>

      <div className="space-y-4">
          {notifications.map((notif) => (
              <motion.div 
                key={notif.id}
                layout
                onClick={() => markAsRead(notif.id)}
                className={`relative p-5 rounded-xl border transition-all cursor-pointer group ${
                    notif.isSeen 
                    ? 'bg-[#0A0A0A] border-white/5 hover:border-white/10' 
                    : 'bg-[#111115] border-indigo-500/20 hover:border-indigo-500/30 shadow-[0_0_15px_-3px_rgba(99,102,241,0.15)]'
                }`}
              >
                  {!notif.isSeen && (
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                  )}

                  <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/5 ${notif.isSeen ? 'bg-zinc-900' : 'bg-[#1a1a20]'}`}>
                          {getIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                          <h3 className={`text-sm font-semibold mb-1 ${notif.isSeen ? 'text-zinc-300' : 'text-white'}`}>
                              {notif.title}
                          </h3>
                          <p className="text-sm text-zinc-500 leading-relaxed mb-2 pr-6">
                              {notif.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-zinc-600">
                              <span>{new Date(notif.createdAt).toLocaleString()}</span>
                              <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">
                                  Ref: {notif.referenceId}
                              </span>
                          </div>
                      </div>
                      <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={18} className="text-zinc-600" />
                      </div>
                  </div>
              </motion.div>
          ))}

          {notifications.length === 0 && (
              <div className="text-center py-20 text-zinc-500">
                  <Bell size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No notifications yet.</p>
              </div>
          )}
      </div>
    </motion.div>
  );
};