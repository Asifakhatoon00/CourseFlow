import React, { useState } from 'react';
import { CheckCircle2, Clock, Building2, BookOpen, ShieldCheck, Plus, Search } from 'lucide-react';

export default function AicteAdminView({ curriculums, setCurriculums }) {
  const [activeSubTab, setActiveSubTab] = useState('universities'); // 'universities' or 'models'
  const [universityList, setUniversityList] = useState([
    { id: 'univ-1', code: 'INST-KAR-042', name: 'Presidency University, Bengaluru', state: 'Karnataka', type: 'Autonomous University', status: 'Approved', approvedDate: '2026-01-15' },
    { id: 'univ-2', code: 'INST-MAH-118', name: 'College of Engineering, Pune (COEP)', state: 'Maharashtra', type: 'Affiliated Autonomous Institute', status: 'Approved', approvedDate: '2026-02-10' },
    { id: 'univ-3', code: 'INST-TN-088', name: 'Vellore Institute of Technology (VIT)', state: 'Tamil Nadu', type: 'Deemed University', status: 'Pending Review', approvedDate: '-' }
  ]);

  const handleApproveUniversity = (id) => {
    setUniversityList(prev => prev.map(u => u.id === id ? { ...u, status: 'Approved', approvedDate: new Date().toISOString().split('T')[0] } : u));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* AICTE Admin Banner */}
      <div className="bg-blue-900 text-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold bg-blue-800 text-blue-200 px-2.5 py-1 rounded">
            AICTE Central Authority Portal
          </span>
          <h1 className="text-xl font-bold mt-2">
            Central Model Curricula & University Approvals Management
          </h1>
          <p className="text-xs text-blue-200 mt-0.5">
            All India Council for Technical Education • Governance Portal
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex gap-2 bg-blue-950 p-1 rounded-lg border border-blue-800">
          <button
            onClick={() => setActiveSubTab('universities')}
            className={`px-3.5 py-2 text-xs font-bold rounded-md transition ${
              activeSubTab === 'universities'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            Approved Universities ({universityList.filter(u => u.status === 'Approved').length})
          </button>
          <button
            onClick={() => setActiveSubTab('models')}
            className={`px-3.5 py-2 text-xs font-bold rounded-md transition ${
              activeSubTab === 'models'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            Model Curricula Standards ({curriculums.length})
          </button>
        </div>
      </div>

      {/* View 1: University Approvals Management */}
      {activeSubTab === 'universities' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">AICTE Approved Universities & Institutes</h2>
              <p className="text-xs text-slate-500">Manage institutional registrations and authorization status.</p>
            </div>
            <button
              onClick={() => {
                const name = prompt("Enter University Name:");
                if (name) {
                  setUniversityList(prev => [
                    ...prev,
                    { id: `univ-${Date.now()}`, code: `INST-NEW-${Math.floor(Math.random()*900+100)}`, name, state: 'Karnataka', type: 'Approved Institute', status: 'Approved', approvedDate: new Date().toISOString().split('T')[0] }
                  ]);
                }
              }}
              className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" /> Register New University
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800">
                  <th className="p-3 font-bold">Institute Code</th>
                  <th className="p-3 font-bold">University / College Name</th>
                  <th className="p-3 font-bold">State</th>
                  <th className="p-3 font-bold">Category</th>
                  <th className="p-3 font-bold text-center">Status</th>
                  <th className="p-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {universityList.map(univ => (
                  <tr key={univ.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-mono font-bold text-blue-900">{univ.code}</td>
                    <td className="p-3 font-bold text-slate-900">{univ.name}</td>
                    <td className="p-3 text-slate-600">{univ.state}</td>
                    <td className="p-3 text-slate-600">{univ.type}</td>
                    <td className="p-3 text-center">
                      <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded ${
                        univ.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {univ.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {univ.status !== 'Approved' ? (
                        <button
                          onClick={() => handleApproveUniversity(univ.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs transition"
                        >
                          Approve Institute
                        </button>
                      ) : (
                        <span className="text-slate-400 font-semibold text-[11px]">Authorized</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: Central AICTE Model Curricula Standards */}
      {activeSubTab === 'models' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">AICTE National Model Curricula Standards</h2>
              <p className="text-xs text-slate-500">Official benchmark frameworks published for technical colleges.</p>
            </div>
            <button
              onClick={() => alert("Creating new AICTE Standard Model Curriculum framework...")}
              className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" /> Add Model Standard
            </button>
          </div>

          <div className="divide-y divide-slate-200">
            {curriculums.map(curr => (
              <div key={curr.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
                      {curr.degree}
                    </span>
                    <span className="text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded font-mono">
                      {curr.version}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Published Standard
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{curr.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {curr.department} • Total Credits: {curr.totalCredits} • Author: {curr.author}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => alert(`Viewing details for ${curr.title}`)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition"
                  >
                    View Units & Modules
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
