import React, { useState } from 'react';

export default function SettingsPage({ user }) {
  const [name, setName] = useState(user?.name || 'Dr. S. K. Mehta');
  const [email, setEmail] = useState(user?.email || 'admin@demo.edu');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="space-y-1 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Profile & Settings</h1>
        <p className="text-xs text-slate-500">Manage account details, notifications, and application preferences.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Profile Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div>
            <label className="block text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Role</label>
            <input
              type="text"
              disabled
              value={user?.roleTitle || 'Institute Admin'}
              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-600 font-bold"
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Institute</label>
            <input
              type="text"
              disabled
              value={user?.institute || 'Presidency University'}
              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-600 font-bold"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Appearance & Security</h2>

        <div className="space-y-4 text-xs">
          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <span className="font-bold text-slate-800">Email Notifications for AI Analysis Results</span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-600 h-4 w-4"
            />
          </label>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password Placeholder</label>
            <input
              type="password"
              value="••••••••••••"
              disabled
              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => alert("Settings saved successfully!")}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
