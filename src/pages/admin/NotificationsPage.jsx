import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockService';
import { Bell, CheckCircle2, AlertCircle, Info, Check } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockService.getNotifications().then(res => {
      setNotifications(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading Notifications...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Notifications Center</h1>
          <p className="text-xs text-slate-500">System notifications and curriculum activity logs.</p>
        </div>
        <button
          onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
          className="text-xs font-bold text-blue-700 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`p-4 rounded-2xl border transition flex items-start justify-between gap-4 ${n.read ? 'bg-white border-slate-200' : 'bg-blue-50/60 border-blue-200 shadow-sm'}`}>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-xl mt-0.5">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
              </div>
            </div>

            {!n.read && (
              <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
