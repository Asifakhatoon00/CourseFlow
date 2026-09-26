import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockService';
import { GraduationCap, BookOpen } from 'lucide-react';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockService.getPrograms().then(res => {
      setPrograms(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-xs text-slate-500 font-semibold animate-pulse">Loading Programs...</div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      <div className="space-y-1 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900">Academic Programs</h1>
        <p className="text-xs text-slate-500">Degree programs and active curriculum versions across departments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map(prog => (
          <div key={prog.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-mono font-bold text-xs bg-blue-700 text-white px-2.5 py-0.5 rounded">
                {prog.code}
              </span>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                AY {prog.academicYear}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{prog.name}</h3>
              <p className="text-xs text-slate-500">{prog.degree} Degree • {prog.durationYears} Years ({prog.semestersCount} Semesters)</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-600">Active Curriculum Version:</span>
              <span className="font-mono font-bold text-blue-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                {prog.currentVersion}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
