import React from 'react';
import { BookOpen, User, LogOut, UploadCloud, Shield, Building2, Search } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, currentUser, onLogout, onOpenLogin }) {
  const isAicteAdmin = currentUser?.type === 'aicte';

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center gap-4">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveTab(currentUser ? (isAicteAdmin ? 'aicte-admin' : 'pdf-compare') : 'public-search')}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center font-bold text-white text-base shadow-sm">
            A
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-snug flex items-center gap-2">
              AICTE Model Curriculum Portal
              <span className="text-[10px] font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                Official
              </span>
            </h1>
            <p className="text-xs text-slate-500">All India Council for Technical Education • Ministry of Education</p>
          </div>
        </div>

        {/* User Account / Auth Actions */}
        <div className="flex items-center space-x-3">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <div className="bg-slate-100 px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs">
                <span className="text-slate-500 font-medium">Logged in as: </span>
                <strong className="text-blue-900 font-bold">{currentUser.name}</strong>
                <span className="text-slate-400 font-semibold ml-1">({currentUser.roleLabel})</span>
              </div>

              <button
                onClick={onLogout}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 transition flex items-center gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5 text-slate-600" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow transition"
            >
              Sign In to Portal
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      {currentUser && (
        <div className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-2 py-2">
              {isAicteAdmin ? (
                <>
                  <button
                    onClick={() => setActiveTab('aicte-admin')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                      activeTab === 'aicte-admin'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    AICTE Central Governance & University Approvals
                  </button>
                  <button
                    onClick={() => setActiveTab('public-search')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                      activeTab === 'public-search'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Public Curricula Catalog
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab('pdf-compare')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      activeTab === 'pdf-compare'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <UploadCloud className="h-4 w-4" />
                    <span>Upload Syllabus PDF & View Comparison Table</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('public-search')}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                      activeTab === 'public-search'
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Browse AICTE Model Catalog
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}