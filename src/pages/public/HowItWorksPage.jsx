import React from 'react';
import { UploadCloud, Sparkles, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    { num: '01', title: 'Upload Existing Curriculum', desc: 'Upload your institute’s existing curriculum PDF document for any degree or branch.', icon: UploadCloud },
    { num: '02', title: 'Extract Information', desc: 'The system extracts structured courses, credits, modules, and course outcomes.', icon: Sparkles },
    { num: '03', title: 'Select Reference', desc: 'Select the official AICTE reference model curriculum (e.g. AICTE 2026 Model).', icon: BookOpen },
    { num: '04', title: 'Run Gap Analysis', desc: 'Identify matched topics, missing modules, outdated content, and skill recommendations.', icon: AlertTriangle },
    { num: '05', title: 'Publish New Version', desc: 'Review changes, edit course outcomes, and create an immutable new version (v1.1).', icon: CheckCircle2 }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-900">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
          5-Step Workflow
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">How the Portal Works</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto">
          From unstructured PDF document ingestion to structured version comparisons.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-blue-50 text-blue-700 rounded-xl font-mono font-bold text-sm flex-shrink-0">
                {s.num}
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-blue-600" />
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
