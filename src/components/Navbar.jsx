import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ArrowRight, Lock } from 'lucide-react';

export default function Navbar({ onOpenLogin }) {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/features', label: 'Features' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              CourseFlow
              <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                SDG 9
              </span>
            </span>
            <span className="text-[11px] text-slate-500 block -mt-0.5">AICTE Model Curriculum Portal • PRJ_154</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-600">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition hover:text-blue-700 ${isActive ? 'text-blue-700 font-bold border-b-2 border-blue-700 py-5' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
