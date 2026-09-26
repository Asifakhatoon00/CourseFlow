import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, Building2, UploadCloud, Users } from 'lucide-react';

export default function AboutAicteView({ onOpenLogin }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span className="inline-block bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-md border border-blue-200">
          About AICTE Model Curriculum Framework
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Standardizing Technical Education Across India
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          The All India Council for Technical Education (AICTE) releases standardized Model Curricula for undergraduate and postgraduate engineering programs. Autonomous and affiliated universities across India utilize this benchmark to align their local academic schemes with national quality standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl w-fit">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">1. Standard AICTE Model</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            AICTE defines the 160-credit framework including Humanities, Basic Sciences, Professional Core, and Industry Electives.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl w-fit">
            <UploadCloud className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">2. University Upload & Gap Analysis</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Colleges upload their local syllabus to instantly identify missing core modules, outdated topics, and industry gaps.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl w-fit">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">3. Board of Studies Approval</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            University academic bodies ratify revisions with side-by-side version diffing and automated Bloom's taxonomy audits.
          </p>
        </div>
      </div>

      <div className="bg-blue-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold">Are you a University Academic Authority?</h3>
          <p className="text-xs text-blue-200 mt-0.5">Sign in to upload your institute's syllabus and perform automated gap comparisons.</p>
        </div>

        <button
          onClick={onOpenLogin}
          className="px-5 py-3 bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold rounded-xl shadow transition flex items-center gap-2"
        >
          <Building2 className="h-4 w-4" />
          <span>Sign In to University Portal</span>
        </button>
      </div>
    </div>
  );
}
