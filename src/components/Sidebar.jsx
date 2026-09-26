import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  Users, 
  History, 
  FileText, 
  LogOut,
  X,
  BookOpen,
  Sparkles,
  ShieldCheck,
  BookMarked,
  Edit3
} from 'lucide-react';

export default function Sidebar({ user, isOpen, onClose, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    if (onClose) onClose();
    if (onLogout) {
      await onLogout();
    } else {
      navigate('/login');
    }
  };

  const role = user?.role || 'admin';
  const isFaculty = role === 'faculty';
  const isSuperAdmin = role === 'super_admin';

  const userDisplayName = user?.name || (isFaculty ? 'Prof. Ananya Rao' : isSuperAdmin ? 'Dr. Ramesh Kumar' : 'Dr. S. K. Mehta');
  const userDisplayInstitute = user?.institute || (isFaculty ? 'Dept. of Computer Science' : isSuperAdmin ? 'AICTE Central HQ, New Delhi' : 'Presidency University');
  const userDisplayRole = user?.roleTitle || (isFaculty ? 'Faculty Member' : isSuperAdmin ? 'AICTE Super Admin' : 'University Admin');

  // Role-based Navigation Items
  let navItems = [];

  if (isFaculty) {
    navItems = [
      { path: '/faculty/dashboard', label: 'My Assigned Courses & COs', icon: BookOpen },
      { path: '/curriculums/builder', label: 'Tree Syllabus & Module Editor', icon: Edit3 },
      { path: '/analysis/analysis-101', label: 'AI Gap Recommendations', icon: Sparkles },
      { path: '/reports', label: 'Download Analysis Reports', icon: FileText }
    ];
  } else if (isSuperAdmin) {
    navItems = [
      { path: '/admin/dashboard', label: 'National Overview & Analytics', icon: ShieldCheck },
      { path: '/curriculums/builder', label: 'Tree Syllabus & Module Editor', icon: Edit3 },
      { path: '/aicte-references', label: 'AICTE Model References', icon: BookMarked },
      { path: '/curriculums/upload', label: 'Upload & Compare Syllabus PDF', icon: UploadCloud },
      { path: '/analysis/analysis-101', label: 'AI Benchmark Comparison Table', icon: Sparkles },
      { path: '/reports', label: 'Download Analysis Reports', icon: FileText }
    ];
  } else {
    navItems = [
      { path: '/curriculums/upload', label: 'Upload & Compare Syllabus PDF', icon: UploadCloud },
      { path: '/curriculums/builder', label: 'Tree Syllabus & Module Editor', icon: Edit3 },
      { path: '/analysis/analysis-101', label: 'AI Benchmark Comparison Table', icon: Sparkles },
      { path: '/faculty', label: 'Add Professors & Access Control', icon: Users },
      { path: '/curriculums/curr-cse-2025/versions', label: 'Syllabus Version Control (v1.0 vs v1.1)', icon: History },
      { path: '/reports', label: 'Download Analysis PDF Reports', icon: FileText }
    ];
  }

  return (
    <>
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:static top-0 left-0 bottom-0 z-50 w-72 bg-slate-900 text-white flex flex-col justify-between transition-transform duration-200 ease-in-out border-r border-slate-800 text-base
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <Link to={isFaculty ? '/faculty/dashboard' : isSuperAdmin ? '/admin/dashboard' : '/curriculums/upload'} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow">
                A
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-white leading-tight">CourseFlow</h1>
                <p className="text-xs text-blue-300 font-bold">AICTE Curriculum Portal</p>
              </div>
            </Link>

            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white p-1">
              <X className="h-7 w-7" />
            </button>
          </div>

          {/* User Info Card */}
          <div className="p-4 bg-slate-800/90 m-4 rounded-xl border border-slate-700/80 space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-base flex items-center justify-center border border-blue-400">
                {userDisplayName.split(' ').map(n=>n[0]).join('')}
              </div>
              <div className="truncate">
                <p className="text-sm font-extrabold text-white truncate">{userDisplayName}</p>
                <p className="text-xs text-slate-300 font-bold truncate">{userDisplayInstitute}</p>
              </div>
            </div>
            <span className="inline-block text-xs font-extrabold bg-blue-500/30 text-blue-200 px-3 py-1 rounded-md border border-blue-400/40">
              {userDisplayRole}
            </span>
          </div>

          {/* Main Navigation Items */}
          <nav className="p-4 space-y-2 flex-1">
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-3 mb-2">Portal Navigation:</p>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose && onClose()}
                  className={`
                    flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-extrabold transition leading-snug
                    ${isActive
                      ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/50'
                      : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sign Out Button */}
        <div className="p-5 border-t border-slate-800">
          <button
            onClick={handleLogoutClick}
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-extrabold rounded-xl transition flex items-center justify-center gap-2 shadow-md"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out Account</span>
          </button>
        </div>
      </aside>
    </>
  );
}

