import React from 'react';
import { UploadCloud, Sparkles, BookOpen, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HeroVisual() {
  const steps = [
    {
      title: 'Institute Curriculum',
      subtitle: 'PDF Upload (B.Tech CSE)',
      icon: UploadCloud,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: 'AI Analysis',
      subtitle: 'Extract Units & Credits',
      icon: Sparkles,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      title: 'AICTE Reference',
      subtitle: 'Model Curriculum 2026',
      icon: BookOpen,
      color: 'bg-slate-100 text-slate-800 border-slate-300'
    },
    {
      title: 'Gap Detection',
      subtitle: 'Topic Matches & Missing Units',
      icon: AlertTriangle,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Recommendations',
      subtitle: 'Suggested Actions & Version 1.1',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full bg-rose-500"></span>
          <span className="h-3 w-3 rounded-full bg-amber-500"></span>
          <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-bold text-slate-500 ml-2 font-mono">Curriculum Development Pipeline Visualizer</span>
        </div>
        <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200">
          Interactive Automated Workflow
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative flex flex-col items-center">
              <div className={`w-full p-4 rounded-xl border ${step.color} shadow-sm space-y-2 text-center h-full flex flex-col justify-between transition hover:scale-105 duration-200`}>
                <div className="w-10 h-10 mx-auto rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{step.subtitle}</p>
                </div>
                <span className="text-[10px] font-mono font-bold opacity-60">Step 0{idx+1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
