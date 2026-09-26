import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2 text-white">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <span className="text-base font-bold">AICTE Unified Curriculum Portal</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A unified government and institutional platform for developing, analyzing, comparing, and continuously improving technical model curricula across all AICTE-approved institutes.
            </p>
            <div className="flex items-center space-x-2 text-blue-400 pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-semibold text-slate-300">Aligned with NEP 2020 & SDG 9 (Industry, Innovation & Infrastructure)</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About PRJ_154</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link to="/features" className="hover:text-white transition">Features & Capabilities</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Demo Accounts</h4>
            <ul className="space-y-2 text-slate-400 font-mono text-[11px]">
              <li>Admin: admin@demo.edu</li>
              <li>Faculty: faculty@demo.edu</li>
              <li>Student: student@demo.edu</li>
              <li>Super Admin: superadmin@demo.edu</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-500 text-[11px]">
          <p>© 2026 AICTE Model Curriculum Portal • All India Council for Technical Education • PRJ_154</p>
          <div className="flex gap-4">
            <span>React + Vite + Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
