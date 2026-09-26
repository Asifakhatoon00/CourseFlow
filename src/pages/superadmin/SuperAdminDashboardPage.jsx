import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockService';
import { Building2, GraduationCap, BookOpen, History, Sparkles, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function SuperAdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockService.getDashboardData().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading AICTE Super Admin Dashboard...</div>;

  const uploadTrendData = [
    { month: 'May', uploads: 24, analyses: 18 },
    { month: 'Jun', uploads: 45, analyses: 38 },
    { month: 'Jul', uploads: 82, analyses: 74 },
    { month: 'Aug', uploads: 120, analyses: 110 },
    { month: 'Sep', uploads: 165, analyses: 154 }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 w-fit">
            <ShieldCheck className="h-4 w-4" /> AICTE Central Super Admin Authority
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">National Technical Education Overview</h1>
          <p className="text-xs text-slate-300 mt-1">Global platform metrics across all registered Indian engineering institutes.</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Institutes</span>
          <h3 className="text-xl font-extrabold text-slate-900">120+</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Programs</span>
          <h3 className="text-xl font-extrabold text-slate-900">35+</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Curriculums</span>
          <h3 className="text-xl font-extrabold text-blue-700">250+</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Versions</span>
          <h3 className="text-xl font-extrabold text-indigo-700">800+</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Analyses</span>
          <h3 className="text-xl font-extrabold text-emerald-700">180+</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">References</span>
          <h3 className="text-xl font-extrabold text-amber-600">3 Active</h3>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Curriculum Document Uploads & AI Scans Over Time
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={uploadTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="uploads" fill="#2563eb" name="Institute Curriculum Uploads" />
              <Bar dataKey="analyses" fill="#10b981" name="AI Alignment Scans Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
