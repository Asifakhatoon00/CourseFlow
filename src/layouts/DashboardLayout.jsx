import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { LogOut, Menu, User, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardLayout({ children, user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutAction = async () => {
    if (onLogout) {
      await onLogout();
    }
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans text-base">
      {/* Sidebar Navigation */}
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogoutAction}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-slate-300 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
            
            {/* Left: Brand / Mobile Menu */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              >
                <Menu className="h-7 w-7" />
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-lg bg-blue-700 text-white font-extrabold text-base flex items-center justify-center">
                  A
                </div>
                <div>
                  <h1 className="text-lg font-extrabold text-slate-900 leading-tight">CourseFlow — AICTE Unified Curriculum Portal</h1>
                  <p className="text-xs text-slate-600 font-bold">Government of India • PRJ_154</p>
                </div>
              </div>
            </div>

            {/* Right: User Profile & Explicit Sign Out */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 bg-slate-100 px-4 py-2 rounded-xl border border-slate-300">
                <User className="h-5 w-5 text-blue-700" />
                <div>
                  <p className="text-sm font-extrabold text-slate-900 leading-tight">{user?.name || 'Dr. S. K. Mehta'}</p>
                  <p className="text-xs text-slate-600 font-bold">{user?.roleTitle || 'University Admin'}</p>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleLogoutAction}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-extrabold rounded-xl transition shadow flex items-center gap-2"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Main Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
