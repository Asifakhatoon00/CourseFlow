import React, { useState } from 'react';
import { Building2, Copy, CheckCircle2, Sliders } from 'lucide-react';
import { MOCK_COLLEGES } from '../mockData';

export default function CollegeHubView() {
  const [colleges, setColleges] = useState(MOCK_COLLEGES);
  const [clonedSuccess, setClonedSuccess] = useState('');

  const handleCloneModel = (collegeId, collegeName) => {
    setClonedSuccess(`AICTE Model Curriculum (v2026.1.0) successfully cloned for ${collegeName}! Local customization workspace enabled.`);
    setColleges(prev => prev.map(c => c.id === collegeId ? { ...c, status: 'Synced (v2026.1)' } : c));
    setTimeout(() => setClonedSuccess(''), 5000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Affiliated Institute Customization & Integration Hub
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enables 10,000+ AICTE-approved colleges to clone central model curricula and customize up to 20–30% local institutional electives.
          </p>
        </div>

        <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-200">
          Multi-Tenant Parent-Child Sync Active
        </span>
      </div>

      {clonedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{clonedSuccess}</span>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
          <h3 className="text-sm font-bold">Registered Autonomous & Affiliated Institutes</h3>
          <span className="text-xs text-slate-300">Total Approved Colleges: 10,480+</span>
        </div>

        <div className="divide-y divide-slate-200">
          {colleges.map(col => (
            <div key={col.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-slate-800 text-white px-2 py-0.5 rounded font-mono">{col.code}</span>
                  <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-2 py-0.5 rounded">{col.type}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1.5">{col.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Local Electives Configured: <span className="font-bold text-slate-700">{col.localElectivesCount} Courses</span> • Status: <span className="font-bold text-emerald-700">{col.status}</span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCloneModel(col.id, col.name)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5"
                >
                  <Copy className="h-3.5 w-3.5" /> Clone Model Curriculum
                </button>
                <button
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition flex items-center gap-1.5"
                >
                  <Sliders className="h-3.5 w-3.5" /> Configure Electives
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}