import React from 'react';
import { BookOpen, CheckCircle2, Clock, Building2, UploadCloud, ArrowRight } from 'lucide-react';

export default function DashboardView({ curriculums, approvalRequests, setActiveTab, currentUser }) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-block bg-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
            Authenticated Portal • {currentUser?.name || 'University Workspace'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            University & AICTE Model Curriculum Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Upload your college syllabus, run automated gap comparison against AICTE model benchmarks, and track Board of Studies (BoS) ratification.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('gap-analysis')}
            className="px-5 py-3 bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            <UploadCloud className="h-4 w-4 text-blue-700" />
            <span>Upload & Compare Syllabus</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">AICTE Model Curricula</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{curriculums.length} Branches</h3>
            <p className="text-xs text-blue-700 mt-1 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> AY 2026-27 Active Standard
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-blue-700">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">BoS Approvals Pending</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
              {approvalRequests.filter(r => r.status === 'Under Review').length} Syllabi
            </h3>
            <p className="text-xs text-amber-600 mt-1 font-semibold flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Committee Review Stage
            </p>
          </div>
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enrolled Universities</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">10,480+</h3>
            <p className="text-xs text-emerald-700 mt-1 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Multi-Tenant Sync Active
            </p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-700">
            <Building2 className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Model Curricula List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Standard AICTE Model Curricula</h3>
              <p className="text-xs text-slate-500">Benchmark reference structures published by Board of Studies.</p>
            </div>
            <button
              onClick={() => setActiveTab('gap-analysis')}
              className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
            >
              Compare Your Syllabus →
            </button>
          </div>

          <div className="space-y-3">
            {curriculums.map(curr => (
              <div key={curr.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition bg-slate-50/60 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
                      {curr.degree}
                    </span>
                    <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      {curr.version}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">{curr.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {curr.courses.length} Core Subjects • Total Credits: {curr.totalCredits}
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('gap-analysis')}
                  className="px-3.5 py-2 text-xs font-bold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 rounded-lg transition"
                >
                  Run Gap Test
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Approvals Overview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Board of Studies Queue</h3>
            <button
              onClick={() => setActiveTab('approval')}
              className="text-xs font-bold text-blue-700 hover:text-blue-800"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {approvalRequests.map(req => (
              <div key={req.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-900 font-mono">{req.subjectCode}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-800">{req.subjectTitle}</p>
                <div className="flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-200 pt-2">
                  <span>{req.submittedBy}</span>
                  <span>{req.submittedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}